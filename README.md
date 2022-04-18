# @gabrielbu/vue-pdf-viewer

Vue PDF viewer components implemented using PDFJS.

## Install

```bash
npm install --save @gabrielbu/vue-pdf-viewer
```

## Demo

`TBD`

### Usage in vue

```js
<template>
  <div id="app" style="height:100vh;width:100vw; position:fixed;">
    <PDFView :src.sync="src" ref="pdfView" fileName="order" :scale.sync="scale">
      <template slot="right-toolbox"></template>
      <!-- Add more buttons/features on the right side of the toolbar -->
      <template slot="left-toolbox"></template>
      <!-- Add more buttons/features on the left side of the toolbar -->
      <template slot="error"></template>
      <!-- Change the error message design -->
      <template slot="loading"></template>
    </PDFView>
  </div>
</template>
<script>
import {PDFView} from '@gabrielbu/vue-pdf-viewer';
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

## API

### Props

#### :src <sup>String / Object - default: null<sup>

`src` accepts the following values:

- URL - example: https://example.com/pdf-content.pdf

- PDF Uint8Array Buffer

- [PDFDataRangeTransport](https://mozilla.github.io/pdf.js/api/draft/PDFDataRangeTransport.html)

- [DocumentInitParameters](https://mozilla.github.io/pdf.js/api/draft/global.html#DocumentInitParameters)

- Base64 encoded PDF buffer

- Base64 string - data:application/pdf;base64, ....

- You can also drag/drop pdf files into the viewer utilizing my own [vue-dropzone](https://github.com/GabrielBuragev/vue-dropzone) directive!

for more details see [`PDFJS.getDocument()`](https://github.com/mozilla/pdf.js/blob/8ff1fbe7f819513e7d0023df961e3d223b35aefa/src/display/api.js#L117).

#### :toolbarVisible <sup>Boolean - default: true<sup>

Toggle toolbar visibility.

#### :downloadFeatureVisible <sup>Boolean - default: true<sup>

Toggle download button feature visibility.

#### :sidebarFeatureVisible <sup>Boolean - default: true<sup>

Toggle sidebar (page navigation bar) visibility.

#### :dropzoneFeatureVisible <sup>Boolean - default: true<sup>

Enable/disable the dropzone(drag-n-drop PDF files) feature.

#### :scale <sup>String - default: "1.25"<sup>

Set the initial scale of the viewer.
You can use it with `:scale.sync` for enabling two-way data binding.

#### :fileName <sup>String - default: "{Date.now()}.pdf"<sup>

Name of the file used when download function is triggered.
