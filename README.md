# vue_pdf_viewer
### Installation
```
npm install vue-pdfjs-viewer
```
### Usage in vue
```js
<template>
<PDFView :src="<Valid PDF source>"></PDFView>
</template>
<script>
import {PDFView} from 'vue-pdfjs-viewer';
export default {
    components:{
        ...
        PDFView
    }
}

</script>
```

### Valid PDF source 
* URL (https://example.com/pdf-content.pdf)
* PDF Uint8Array Buffer
* [PDFDataRangeTransport](https://mozilla.github.io/pdf.js/api/draft/PDFDataRangeTransport.html)
* [DocumentInitParameters](https://mozilla.github.io/pdf.js/api/draft/global.html#DocumentInitParameters)
* Base64 encoded PDF buffer 
    * data:application/pdf;base64, ....
    * JVBERi0xLjcKCjEgMCBvYmog.....
* You can also drag/drop pdf files into the viewer !