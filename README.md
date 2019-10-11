
#  vue_pdfjs_viewer


###  Installation

`npm install vue_pdfjs_viewer`

###  Usage in vue

```js

<template>
  <div id="app" style="height:593px">
    <PDFView
      :src.sync="src" // Valid PDF Source (read below for more info)
      ref="pdfView"
      fileName="order" // Name of the file that's going to be downloaded (default: {Date.now()}.pdf )
      :sidebarFeatureVisible="false" // Should the sidebar feature be visible ? (default: true)
      :downloadFeatureVisible="false" // Should the download button feature be active ? (default: true)
      :dropzoneFeatureVisible="false" // Should the pdf dropzone feature be active ? (default: true)
      :toolbarVisible="false" // Should the toolbar be visible ? (default: true)
      scale.sync="scale" // String value for the page scale ["0.75", "1", "1.25", "1.5", "auto"] are supported 
    > 
        <template slot="right-toolbox"></template> <!-- Add more buttons/features on the right side of the toolbar -->
        <template slot="left-toolbox"></template> <!-- Add more buttons/features on the left side of the toolbar -->
        <template slot="error"></template> <!-- Change the error message design -->
        <template slot="loading"></template> <!-- Change the pdf loader design -->
    </PDFView>
  </div>
</template>
<script>
import {PDFView} from 'vue_pdfjs_viewer';
export default {
  components:{
  // ...
    PDFView
  },
  data(){
    return {
      scale: "1.25"
    }
  }
}
</script>
```

  

###  Valid PDF source

* URL (https://example.com/pdf-content.pdf)

* PDF Uint8Array Buffer

* [PDFDataRangeTransport](https://mozilla.github.io/pdf.js/api/draft/PDFDataRangeTransport.html)

* [DocumentInitParameters](https://mozilla.github.io/pdf.js/api/draft/global.html#DocumentInitParameters)

* Base64 encoded PDF buffer

* data:application/pdf;base64, ....

* You can also drag/drop pdf files into the viewer !