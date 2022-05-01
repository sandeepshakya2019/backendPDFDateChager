const express = require("express");
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const { writeFileSync, readFileSync } = require("fs");

const app = express();

async function createPDF() {
  const document = await PDFDocument.load(readFileSync("./tobemodify.pdf"), {
    updateMetadata: false,
  });

  const firstPage = document.getPage(0);
  const { width, height } = firstPage.getSize();
  console.log(width, height);

  const date = new Date().toUTCString().split(" ");
  let modifieddate = "";
  modifieddate += date[2] + " ";
  modifieddate += date[1] + ", ";
  modifieddate += date[3];

  firstPage.moveTo(105, 746);
  firstPage.drawRectangle({
    width: 290,
    height: 110,

    color: rgb(1, 1, 1),
  });
  firstPage.moveTo(110, 751);

  firstPage.drawText(modifieddate, {
    size: 12,
  });

  writeFileSync("modified.pdf", await document.save());
}

createPDF().catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("[+] Server is listening");
});
