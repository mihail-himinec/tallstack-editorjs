import EditorJS from "@editorjs/editorjs";
import ImageTool from "@editorjs/image";
import List from "@editorjs/nested-list";
import Header from "@editorjs/header";
import Underline from "@editorjs/underline";
import Code from "@editorjs/code";
import InlineCode from "@editorjs/inline-code";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import RawTool from "@editorjs/raw";
import Delimiter from "@editorjs/delimiter";
import { StyleInlineTool } from "editorjs-style";
import DragDrop from "editorjs-drag-drop";
import Paragraph from "@editorjs/paragraph";
import Alert from "editorjs-alert";
import Warning from "@editorjs/warning";
import Embed from "@editorjs/embed";
import ColorPlugin from "editorjs-text-color-plugin";
import Tooltip from "editorjs-tooltip";
import CheckList from "@editorjs/checklist"
import AttachesTool from "@editorjs/attaches";
import AlignmentTuneTool from "editorjs-text-alignment-blocktune";
import Strikethrough from "@sotaproject/strikethrough";
import MermaidTool from "editorjs-mermaid";


document.addEventListener("alpine:init", () => {
    Alpine.data(
        "editorjs",
        ({ state, statePath, placeholder, readOnly, tools, minHeight }) => ({
            instance: null,
            state: state,
            tools: tools,
            // uploaded File
            uploadImage: function (blob) {
                return new Promise((resolve) => {
                    this.$wire.upload(
                        `componentFileAttachments.${statePath}`,
                        blob,
                        (uploadedFilename) => {
                            this.$wire
                                .getFormComponentFileAttachmentUrl(statePath)
                                .then((url) => {
                                    if (!url) {
                                        return resolve({
                                            success: 0,
                                        });
                                    }
                                    return resolve({
                                        success: 1,
                                        file: {
                                            url: url,
                                        },
                                    });
                                });
                        }
                    );
                });
            },

            init() {
                let enabledTools = {};

                if (this.tools.includes("header")) {
                    enabledTools.header = {
                        class: Header,
                        inlineToolbar: true,
                        tunes: ['alignmenttune'],
                    };
                }
                if (this.tools.includes("image")) {
                    enabledTools.image = {
                        class: ImageTool,
                        config: {
                            uploader: {
                                uploadByFile: (file) => this.uploadImage(file),
                                uploadByUrl: (url) => {
                                    return new Promise(async (resolve) => {
                                        return fetch(url)
                                            .then((res) => res.blob())
                                            .then((blob) => resolve(this.uploadImage(blob)));
                                    });
                                },
                            },
                        },
                    };
                }
                if (this.tools.includes("delimiter"))
                    enabledTools.delimiter = Delimiter;
                if (this.tools.includes("list")) {
                    enabledTools.list = {
                        class: List,
                        inlineToolbar: true,
                        tunes: ['alignmenttune'],
                    };
                }
                if (this.tools.includes("underline"))
                    enabledTools.underline = Underline;
                if (this.tools.includes("strikethrough")) {
                    enabledTools.strikethrough = {
                        class: Strikethrough,
                        inlineToolbar: true,
                    }
                }
                if (this.tools.includes("quote")) {
                    enabledTools.quote = {
                        class: Quote,
                        inlineToolbar: true,
                    };
                }
                if (this.tools.includes("table")) {
                    enabledTools.table = {
                        class: Table,
                        inlineToolbar: true,
                    };
                }
                if (this.tools.includes("raw"))
                    enabledTools.raw = RawTool;
                if (this.tools.includes("code"))
                    enabledTools.code = Code;
                if (this.tools.includes("inline-code"))
                    enabledTools.inlineCode = InlineCode;
                if (this.tools.includes("style"))
                    enabledTools.style = StyleInlineTool;
                if (this.tools.includes("paragraph")) {
                    enabledTools.paragraph = {
                        class: Paragraph,
                        tunes: ['alignmenttune'],
                    }
                }

                if (this.tools.includes("alert"))
                    enabledTools.alert = Alert;
                if (this.tools.includes("warning")) {
                    enabledTools.warning = {
                        class: Warning,
                        inlineToolbar: true,
                        config: {
                            titlePlaceholder: 'Заголовок',
                            messagePlaceholder: 'Сообщение',
                        },
                    };
                }

                if (this.tools.includes("embed")) {
                    enabledTools.embed = {
                        class: Embed,
                        inlineToolbar: true,
                        config: {
                            services: {
                                youtube: true,
                                miro: true,
                            },
                        }
                    };
                }

                if (this.tools.includes("color")) {
                    enabledTools.color = {
                        class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
                        config: {
                            colorCollections: ['#EC7878', '#9C27B0', '#673AB7', '#3F51B5', '#0070FF', '#03A9F4', '#00BCD4', '#4CAF50', '#8BC34A', '#CDDC39', '#FFF'],
                            defaultColor: '#FF1300',
                            type: 'text',
                            customPicker: true // add a button to allow selecting any colour
                        }
                    }
                }
                if (this.tools.includes("marker")) {
                    enabledTools.marker = {
                        class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
                        config: {
                            defaultColor: '#FFBF00',
                            type: 'marker',
                            icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`
                        }
                    }
                }
                if (this.tools.includes("tooltip")) {
                    enabledTools.tooltip = {
                        class: Tooltip,
                        inlineToolbar: true,
                        config: {
                            location: 'left',
                            highlightColor: '#FFEFD5',
                            underline: true,
                            backgroundColor: '#154360',
                            textColor: '#FDFEFE',
                            holder: 'editorId',
                        }
                    }
                }

                if (this.tools.includes("checklist")) {
                    enabledTools.checklist = {
                        class: CheckList,
                        inlineToolbar: true,
                    }
                }

                if (this.tools.includes("mermaid")) {
                    enabledTools.mermaid = {
                        class: MermaidTool,
                        inlineToolbar: true,
                    }
                }

                if (this.tools.includes("attaches")) {
                    enabledTools.attaches = {
                        class: AttachesTool,
                        config: {
                            uploader: {
                                uploadByFile: (file) => this.uploadImage(file),
                                uploadByUrl: (url) => {
                                    return new Promise(async (resolve) => {
                                        return fetch(url)
                                            .then((res) => res.blob())
                                            .then((blob) => resolve(this.uploadImage(blob)));
                                    });
                                },
                            },
                            buttonText: 'Выберите файл',
                        },
                    }
                }

                if (this.tools.includes("alignmenttune")) {
                    enabledTools.alignmenttune = {
                        class: AlignmentTuneTool,
                        inlineToolbar: true,
                        config:{
                            default: "left",
                            blocks: {
                                header: 'left',
                                list: 'left'
                            }
                        },
                    }
                }

                this.instance = new EditorJS({
                    holder: this.$el,
                    minHeight: minHeight,
                    data: this.state,
                    placeholder: placeholder,
                    readOnly: readOnly,
                    tools: enabledTools,

                    onChange: () => {
                        this.instance.save().then((outputData) => {
                            this.state = outputData;
                        });
                    },
                    onReady: () => {
                        new DragDrop(this.instance);
                        MermaidTool.config({ 'theme': 'neutral' });
                    },
                });
            },
        })
    );
});
