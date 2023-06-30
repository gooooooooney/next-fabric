"use client"
import React, { useEffect, useState } from "react";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import type { FilePondFile, ProcessServerConfigFunction } from "filepond";
import "filepond-plugin-file-poster/dist/filepond-plugin-file-poster.min.css";
import FilePondPluginFilePoster from "filepond-plugin-file-poster";
import FilePondPluginImageEditor from "@pqina/filepond-plugin-image-editor";

// pintura
import "@pqina/pintura/pintura.css";
import {
  // editor
  openEditor,
  locale_en_gb,
  createDefaultImageReader,
  createDefaultImageWriter,
  createDefaultImageOrienter,
  createDefaultShapePreprocessor,
  legacyDataToImageState,
  processImage,

  // plugins
  setPlugins,
  plugin_crop,
  plugin_crop_locale_en_gb,
  plugin_finetune,
  plugin_finetune_locale_en_gb,
  plugin_finetune_defaults,
  plugin_filter,
  plugin_filter_locale_en_gb,
  plugin_filter_defaults,
  plugin_annotate,
  plugin_annotate_locale_en_gb,
  markup_editor_defaults,
  markup_editor_locale_en_gb,
  getEditorDefaults,
} from "@pqina/pintura";
import { useMaterialState } from "@/src/store/materiaState";
// Register the plugins
registerPlugin(
  // FilePondPluginImageExifOrientation,
  // FilePondPluginImagePreview,
  // FilePondPluginImageCrop,
  FilePondPluginFilePoster,
  FilePondPluginImageEditor,
  FilePondPluginFileValidateType,
);

setPlugins(plugin_crop, plugin_finetune, plugin_filter, plugin_annotate);

const FilePondUpload = React.forwardRef(({ }, ref) => {
  const materialState = useMaterialState()
  const [files, setFiles] = useState<FilePondFile['file'][]>([]);
  const fileRef = React.useRef(null);

  useEffect(() => {
    console.log(files);
  }, [files])

  const handleProcessing: ProcessServerConfigFunction = (fieldName, file, metadata, load, error, progress, abort) => {
    console.log(file)
  }
  return (
    <div className="container mt-4">
      <FilePond
        ref={fileRef}
        allowMultiple={false}
        files={files}
        credits={false}
        labelIdle='<span class="filepond--label-action">Upload files</span>'
        allowReorder={true}
        // server={{ process: handleProcessing }}
        acceptedFileTypes={['image/*']}
        onupdatefiles={fileItems => {
          if (fileItems.length === 0) {
            // onRequestClear();
          }
          setFiles(fileItems.map(fileItem => fileItem.file));
          materialState.updateMaterialData({
            images: fileItems.map(fileItem => fileItem.file) as File[]
          })
        }}
        imageEditorAfterWriteImage={(res) => {
          return res.dest
        }}
        imageEditor={{

          // map legacy data objects to new imageState objects
          legacyDataToImageState: legacyDataToImageState,

          // used to create the editor, receives editor configuration, should return an editor instance
          createEditor: openEditor,

          // Required, used for reading the image data
          imageReader: [
            createDefaultImageReader,
            {
              /* optional image reader options here */
            },
          ],

          // optionally. can leave out when not generating a preview thumbnail and/or output image
          imageWriter: [
            createDefaultImageWriter,
            {
              targetSize: {
                width: 128,
                height: 128,
                fit: 'cover',
              },
              /* optional image writer options here */
            },
          ],

          // used to generate poster images, runs an editor in the background
          imageProcessor: ((src, option) => {
            return processImage(src, option)
          }) as typeof processImage,

          // editor options
          editorOptions: {
            ...getEditorDefaults(),
            utils: ["crop", "finetune", "filter", "annotate"],
            imageOrienter: createDefaultImageOrienter(),
            shapePreprocessor: createDefaultShapePreprocessor(),
            ...plugin_finetune_defaults,
            ...plugin_filter_defaults,
            ...markup_editor_defaults,
            locale: {
              ...locale_en_gb,
              ...plugin_crop_locale_en_gb,
              ...plugin_finetune_locale_en_gb,
              ...plugin_filter_locale_en_gb,
              ...plugin_annotate_locale_en_gb,
              ...markup_editor_locale_en_gb,
            },
          },
        }}
      />
    </div>
  )
})
FilePondUpload.displayName = "FilePondUpload"
export default FilePondUpload