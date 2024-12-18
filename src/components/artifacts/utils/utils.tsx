import html2canvas from 'html2canvas';

export const handleScreenshot = (pageRef: React.RefObject<HTMLDivElement>) => {
    console.log('Attempting to take screenshot', pageRef);
    if (pageRef.current) {
        console.log('Page ref current exists, generating screenshot');
        return html2canvas(pageRef.current).then(canvas => {
            console.log('Screenshot canvas generated successfully');
            const dataUrl = canvas.toDataURL("image/png");
            console.log('Screenshot data URL created', dataUrl);
            return dataUrl;
        }).catch(error => {
            console.error('Error generating screenshot', error);
            return null;
        });
    }
    console.log('Page ref current is null, cannot take screenshot');
    return Promise.resolve(null);
};
