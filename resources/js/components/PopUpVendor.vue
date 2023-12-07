<template @click="closePopUpVendor">
    <div class="vendor-overlay">
        <div class="container">
            <div class="description">
                <div class="description-title">Vendor Invoice No.</div>
                <div v-if="vendorNumberWarning" class="vendorNumberWarning">
                    *Vendor Invoice Number cannot be empty
                </div>
                <div class="input-class">
                    <input
                        type="text"
                        placeholder="Enter Vendor Invoice Number"
                        v-model="vendorNumberMessage"
                    />
                </div>
            </div>
            <div class="attachment">
                <div class="attachment-tile">Invoice Attachment</div>
                <div
                    v-if="vendorAttachmentWarning"
                    class="vendorAttachmentWarning"
                >
                    *Vendor Attachment cannot be empty
                </div>
                <button
                    type="button"
                    class="attachment-button vendor-attachment-button"
                    @click="addVendorAttachment"
                    v-if="vendorAttachment.length === 0"
                >
                    <font-awesome-icon :icon="['fas', 'plus']" />
                    Add Attachment
                </button>
                <div v-if="vendorAttachment.length > 0">
                    <ul>
                        <li
                            class="attachment-list"
                            v-for="(attachment, index) in vendorAttachment"
                            :key="index"
                        >
                            <div class="attachment-item">
                                <div class="attachment-icon">
                                    <font-awesome-icon
                                        :icon="['fas', 'paperclip']"
                                        class="icon-for-attachment"
                                    />
                                </div>
                                <div class="file-info">
                                    <div class="file-name">
                                        {{ attachment.fileName }}
                                    </div>
                                    <div class="file-uploader">
                                        By {{ attachment.adminName }} on
                                        {{ attachment.timeAdded }}
                                    </div>
                                </div>
                                <div
                                    class="delete-icon"
                                    @click="deleteAttachment(index)"
                                >
                                    <font-awesome-icon
                                        :icon="['fas', 'trash']"
                                    />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="attachment">
                <div class="attachment-tile">Supporting Document</div>
                <button
                    type="button"
                    class="attachment-button"
                    @click="addSupportingDocument"
                >
                    <font-awesome-icon :icon="['fas', 'plus']" />
                    Add Attachment
                </button>
                <div v-if="supportingDocument.length > 0">
                    <ul>
                        <li
                            class="attachment-list"
                            v-for="(attachment, index) in supportingDocument"
                            :key="index"
                        >
                            <div class="attachment-item">
                                <div class="attachment-icon">
                                    <font-awesome-icon
                                        :icon="['fas', 'paperclip']"
                                        class="icon-for-attachment"
                                    />
                                </div>
                                <div class="file-info">
                                    <div class="file-name">
                                        {{ attachment.documentName }}
                                    </div>
                                    <div class="file-uploader">
                                        By {{ attachment.adminName }} on
                                        {{ attachment.timeAdded }}
                                    </div>
                                </div>
                                <div
                                    class="delete-icon"
                                    @click="deleteDocument(index)"
                                >
                                    <font-awesome-icon
                                        :icon="['fas', 'trash']"
                                    />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="action-buttons">
                <button
                    type="button"
                    class="cancel-button"
                    @click="closePopUpVendor"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    class="submit-button"
                    @click="submitPopUpVendor"
                >
                    Submit
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            vendorNumberMessage: this.editingVendorData
                ? this.editingVendorData.vendorNumber
                : null,
            vendorAttachment: [],
            supportingDocument: [],
            vendorNumberWarning: false,
            vendorAttachmentWarning: false,
        };
    },
    props: ["filteredProducts", "editingVendorData"],
    computed: {
        ...mapGetters({
            adminOnline: "example/adminOnline", //minta ke getters
        }),
    },
    mounted() {
        // Ketika komponen dimuat, cek apakah ada nilai dalam editingVendorData
        if (this.editingVendorData) {
            // Jika ada, isi nilai pada state komponen
            this.vendorNumberMessage = this.editingVendorData.vendorNumber;
            this.vendorAttachment =
                this.editingVendorData.vendorAttachment || [];
            this.supportingDocument =
                this.editingVendorData.supportingDocument || [];
        }
    },

    methods: {
        closePopUpVendor() {
            this.vendorNumberWarning = false;
            this.vendorAttachmentWarning = false;
            this.$emit("emit-closePopUpVendor");
        },

        submitPopUpVendor() {
            console.log("editingVendorData isinya", this.editingVendorData);
            this.vendorNumberWarning = !this.vendorNumberMessage;
            this.vendorAttachmentWarning = this.vendorAttachment.length === 0;

            if (this.vendorNumberWarning || this.vendorAttachmentWarning) {
                return;
            }

            

            const newInvoice = {
                vendorNumber: this.vendorNumberMessage,
                vendorAttachment: this.vendorAttachment,
                supportingDocument: this.supportingDocument,
            };

            if (
                this.editingVendorData &&
                Object.keys(this.editingVendorData).length > 0
            ) {
                console.log("response edit");

                const index = this.filteredProducts.vendorInvoice.findIndex( invoice => invoice.vendorNumber === this.editingVendorData.vendorNumber);
                console.log('nilai index', index)
                if (index !== -1){
                    console.log('response index')
                    this.filteredProducts.vendorInvoice[index] = newInvoice;
                    
                }               

                this.$emit("emit-closePopUpVendor");
                return;
            }

            this.filteredProducts.vendorInvoice.push(newInvoice);

            (this.vendorNumber = ""),
                (this.vendorAttachment = []),
                (this.supportingDocument = []);

            this.$emit("emit-closePopUpVendor");
        },

        addVendorAttachment() {
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.addEventListener("change", this.handleVendorAttachment);
            fileInput.click();
        },

        handleVendorAttachment(event) {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const timeAdded = new Date().toLocaleString("id-ID", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                });

                // id atttachment
                const idAttachment = `ATT-${new Date().getTime()}`;

                const newAttachment = {
                    attachmentId: idAttachment,
                    fileName: file.name,
                    adminName: this.adminOnline,
                    timeAdded,
                };

                //push nilai ke dalam attahcments
                this.vendorAttachment.push(newAttachment);
            }

            //sembunyikan button attachment
            this.$nextTick(() => {
                if (this.vendorAttachment.length > 0) {
                    const attachmentButton = document.querySelector(
                        ".vendor-attachment-button"
                    );
                    if (attachmentButton) {
                        attachmentButton.style.display = "none";
                    }
                }
            });
        },

        deleteAttachment(index) {
            this.vendorAttachment.splice(index, 1);
        },

        addSupportingDocument() {
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.addEventListener("change", this.handleSupportingDocument);
            fileInput.click();
        },

        handleSupportingDocument(event) {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const timeAdded = new Date().toLocaleString("id-ID", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                });

                // id atttachment
                const idDocument = `ATT-${new Date().getTime()}`;

                const newDocument = {
                    documentId: idDocument,
                    documentName: file.name,
                    adminName: this.adminOnline,
                    timeAdded,
                };

                //push nilai ke dalam attahcments
                this.supportingDocument.push(newDocument);
            }
        },
        deleteDocument(index) {
            this.supportingDocument.splice(index, 1);
        },
    },
};
</script>

<style scoped>
.vendor-overlay {
    position: fixed;
    height: 100%;
    width: 100%;
    margin: 0;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.container {
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: white;
    border: 1px solid black;
    width: 40%;
    min-width: 500px;
    margin: 0;
    transform: translate(-50%, -50%);
    padding: 1rem;
}

.container-title {
    margin: 0 auto;
    font-size: 1.3rem;
    font-weight: 500;
    width: 100%;
    display: flex;
    justify-content: center;
}

.admin-in-charge,
.description {
    margin-top: 0.5rem;
}

.admin-title,
.description-title {
    font-size: 0.8rem;
}

.description .input-class {
    width: 100%;
    background-color: #fcfbfb;
    color: black;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
    transition: border-color 0.3s;
    padding: 0;
    margin: 0;
}

.input-class input {
    border: none;
    width: 100%;
    margin: 0;
}

.description input:focus {
    outline: none;
}

.description input::placeholder {
    font-style: italic;
}

.attachment-tile {
    margin-top: 1rem;
}

.vendorNumberWarning,
.vendorAttachmentWarning {
    font-size: smaller;
    color: #e43623;
    font-style: italic;
}

.attachment-button {
    color: #090909;
    padding: 0.5rem 1.3rem;
    border-radius: 0.5em;
    background: #e8e8e8;
    border: 1px solid #e8e8e8;
    transition: all 0.3s;
    margin: 0;
    margin-top: 0.7rem;
    box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
}

.action-buttons {
    margin-top: 1.3rem;
    margin-left: auto;
    display: flex;
    justify-content: flex-end;
}

.cancel-button,
.submit-button {
    transform: scale(0.8);
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    width: 20%;
    margin: 5px;
    color: #fff;
}

.cancel-button {
    background-color: #e74c3c;
}

.submit-button {
    background-color: #2ecc71;
}

.cancel-button:hover {
    background-color: #c0392b;
}

.submit-button:hover {
    background-color: #27ae60;
}

.attachment-list {
    list-style: none;
    margin-top: 0.5rem;
}

.attachment-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 90%;
    margin: 0;
    border-radius: 8px;
    background-color: #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, transform 0.3s;
    cursor: pointer;
}

.attachment-item:hover {
    background-color: #dad7d7;
    transform: scale(1.005);
}

.attachment-icon {
    height: 100%;
    padding-right: 0.5rem;
}

.file-info .file-name {
    font-size: smaller;
}

.file-info .file-uploader {
    font-size: x-small;
}

.delete-icon {
    color: rgb(192, 15, 15);
    margin-left: auto;
    margin-right: 0.5rem;
}

.delete-icon:hover {
    color: red;
}
</style>
