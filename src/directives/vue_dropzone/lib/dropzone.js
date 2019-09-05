let Dropzone = function(params) {
  let defaultDropzoneOptions = {
    extensions: ["pdf"],
    maxFile: 1,
    onSuccess: () => {},
    onError: () => {},
    onDragEnter: () => {},
    onDragLeave: () => {}
  };
  let lastenter;
  let fExtensionMatch = /\.([0-9a-z]+)(?:[\?#]|$)/i;

  Object.assign(defaultDropzoneOptions, params);

  this.onDrop = async ({ files }) => {
    defaultDropzoneOptions.onDragLeave();

    let filesObjects = files.entries();
    let fObject;

    while ((fObject = filesObjects.next().value)) {
      let fileExtension = fObject[0].match(fExtensionMatch);
      if (
        !fileExtension ||
        !defaultDropzoneOptions.extensions.includes(fileExtension[1])
      ) {
        let msg = ["Invalid file extension - ", fileExtension[0]].join("");
        return defaultDropzoneOptions.onError(msg);
      }

      let file = fObject[1];
      let fileBuffer = await file.arrayBuffer();
      return defaultDropzoneOptions.onSuccess(fileBuffer);
    }
  };
  this.onDropStart = () => {};
  this.onDropError = msg => {
    defaultDropzoneOptions.onError(msg);
  };
  this.onDragEnter = function(event) {
    lastenter = event.target;
    defaultDropzoneOptions.onDragEnter();
  };
  this.onDragLeave = function(event) {
    if (lastenter === event.target) {
      defaultDropzoneOptions.onDragLeave();
    }
  };
};

export default Dropzone;
