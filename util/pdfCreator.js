import BarChart from "/components/BarChart";
import PieChart from "/components/PieChart";

export default async ({ doc, elements }) => {
	//var newCanvas = BarChart

	//create image from dummy canvas
	//var newCanvasImg = newCanvas.toDataURL("image/jpeg", 1.0);

	//creates PDF from img
	/*var doc = new jsPDF('portrait');
	doc.setFontSize(22);
	doc.text("Sollte die Türkei der EU beitreten?", 20, 20);

	doc.setFontSize(20)
	doc.text("Quelle", 20, 50);
    

	//doc.addImage(newCanvasImg, 'JPEG', 10, 10, 280, 150 );
	doc.save('new-canvas.pdf');*/
	/*
	let top = 20;
	const padding = 10;

	for (let i = 0; i < elements.length; i++) {
		const el = elements.item(i);
		const imgData = await htmlToImage.toPng(el);

		let elHeight = el.offsetHeight;
		let elWidth = el.offsetWidth;

		const pageWidth = doc.internal.pageSize.getWidth();

		if (elWidth > pageWidth) {
			const ratio = pageWidth / elWidth;
			elHeight = elHeight * ratio - padding;
			elWidth = elWidth * ratio - padding;
		}

		const pageHeight = doc.internal.pageSize.getHeight();

		if (top + elHeight > pageHeight) {
			doc.addPage();
			top = 20;
		}

		doc.addImage(imgData, "PNG", padding, top, elWidth, elHeight, `image${i}`);
		top += elHeight;
	}*/

	
}