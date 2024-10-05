class SVGPDFRenderer {
    constructor(container) {
        this.container = container;
        this.pages = [];
        this.currentPage = 0;
        
        // Zoom and pan properties
        this.scale = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.isDragging = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.container.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.container.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.container.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.container.addEventListener('wheel', this.onWheel.bind(this));
    }

    onMouseDown(event) {
        this.isDragging = true;
        this.lastMouseX = event.clientX;
        this.lastMouseY = event.clientY;
    }

    onMouseMove(event) {
        if (!this.isDragging) return;

        const dx = event.clientX - this.lastMouseX;
        const dy = event.clientY - this.lastMouseY;

        this.offsetX += dx;
        this.offsetY += dy;

        this.lastMouseX = event.clientX;
        this.lastMouseY = event.clientY;

        this.renderCurrentPage();
    }

    onMouseUp() {
        this.isDragging = false;
    }

    onWheel(event) {
        event.preventDefault();
        const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
        
        const rect = this.container.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        this.offsetX = mouseX - (mouseX - this.offsetX) * zoomFactor;
        this.offsetY = mouseY - (mouseY - this.offsetY) * zoomFactor;
        
        this.scale *= zoomFactor;

        this.renderCurrentPage();
    }

    addPage(page) {
        this.pages.push({
            svg: page.svg
        });
        this.renderCurrentPage();
    }

    renderCurrentPage() {
        const page = this.pages[this.currentPage];
        if (!page) return;

        // Clear previous content
        this.container.innerHTML = '';

        // Create a new SVG element
        const svgElement = new DOMParser().parseFromString(page.svg, 'image/svg+xml').documentElement;

        // Apply zoom and pan
        svgElement.style.transform = `scale(${this.scale}) translate(${this.offsetX}px, ${this.offsetY}px)`;
        svgElement.style.transformOrigin = '0 0';

        // Append the SVG to the container
        this.container.appendChild(svgElement);
    }

    nextPage() {
        if (this.currentPage < this.pages.length - 1) {
            this.currentPage++;
            this.renderCurrentPage();
            return true;
        }
        return false;
    }

    prevPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.renderCurrentPage();
            return true;
        }
        return false;
    }
}

// Main entry point
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('pdfContainer');
    const pdfInput = document.getElementById('pdfInput');
    const sendButton = document.getElementById('sendButton');
    const output = document.getElementById('output');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    const pageInfo = document.getElementById('pageInfo');
    const renderer = new SVGPDFRenderer(container);

    const ws = new WebSocket('ws://localhost:8080/ws');

    ws.onopen = () => {
        console.log('Connected to WebSocket');
        sendButton.disabled = false;
    };

    ws.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            console.log('Received processed PDF:', data);

            if (data.pages && Array.isArray(data.pages)) {
                data.pages.forEach((page, index) => {
                    console.log(`Processing page ${index + 1} of ${data.pageCount}`);
                    renderer.addPage(page);
                });
                updatePageInfo();
            } else {
                console.warn('Invalid or missing page data in received message.');
            }
        } catch (error) {
            console.error('Error processing WebSocket message:', error);
        }
    };

    ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
        output.textContent = 'WebSocket Error: ' + error.message;
    };

    ws.onclose = () => {
        console.log('Disconnected from WebSocket');
        sendButton.disabled = true;
    };

    sendButton.onclick = () => {
        const file = pdfInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64PDF = e.target.result.replace(/^data:application\/pdf;base64,/, '');
                ws.send(base64PDF);
                output.textContent = 'Sending PDF to server...';
            };
            reader.readAsDataURL(file);
        } else {
            output.textContent = 'Please select a PDF file first.';
        }
    };

    pdfInput.onchange = () => {
        sendButton.disabled = !pdfInput.files.length;
    };

    prevPageButton.onclick = () => {
        if (renderer.prevPage()) {
            updatePageInfo();
        }
    };

    nextPageButton.onclick = () => {
        if (renderer.nextPage()) {
            updatePageInfo();
        }
    };

    function updatePageInfo() {
        pageInfo.textContent = `Page ${renderer.currentPage + 1} of ${renderer.pages.length}`;
    }
});
