import html2canvas from "html2canvas";

export const handleScreenshot = (pageRef: React.RefObject<HTMLDivElement>) => {
    if (pageRef.current && window.getComputedStyle(pageRef.current).display !== 'none') {
        // Ensure the element has dimensions
        const element = pageRef.current;
        
        // Wait for next frame to ensure element is rendered
        return new Promise(resolve => setTimeout(resolve, 0))
            .then(() => {
                // Check if element has dimensions
                if (element.offsetWidth === 0 || element.offsetHeight === 0) {
                    throw new Error('Element has no dimensions');
                }
                
                return html2canvas(element, {
                    // Force a minimum size if needed
                    width: element.offsetWidth || 1200,
                    height: element.offsetHeight || 800,
                    // Improve rendering quality
                    scale: 2,
                    logging: false
                });
            })
            .then(canvas => {
                const dataUrl = canvas.toDataURL("image/png");
                return dataUrl;
            })
            .catch(error => {
                console.error('Error generating screenshot:', error);
                return null;
            });
    }
    return Promise.resolve(null);
};