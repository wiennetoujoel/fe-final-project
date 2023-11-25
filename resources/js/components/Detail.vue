<template>
    <navbar />

    <div class="main-container">
        <sidebar />
        <div class="container">
            <Header />
            <div class="d-flex justify-content-end mb-3">
                <template v-if="filteredProducts.status !== 'Draft'">
                    <BtnEmailExcel />
                </template>
                <template v-else> </template>
            </div>

            <div class="card-container card" type="card">
                <div class="information-navigation">
                    <div class="backButton">
                        <button
                            type="button"
                            class="back-button"
                            @click="backwards()"
                        >
                            <font-awesome-icon
                                :icon="['fas', 'chevron-left']"
                                style="color: #ae445a"
                            />
                            Back
                        </button>
                    </div>
                    <div class="terminate-modify">
                        <button
                            type="button"
                            class="terminate-button"
                            onclick="terminate"
                        >
                            <font-awesome-icon
                                :icon="['fas', 'ban']"
                                style="color: #f90606"
                            />
                            Terminate
                        </button>
                        <button
                            type="button"
                            class="modify-button"
                            onclick="modify"
                        >
                            <font-awesome-icon
                                :icon="['fas', 'pencil']"
                                style="color: #ae445a"
                            />
                            Modify
                        </button>
                    </div>
                </div>
                <div class="information">
                    <div class="logistic-type card">
                        <div class="information-title">Type</div>
                        <div class="information-body">
                            <template v-if="filteredProducts.type === 'LI'">
                                <p>
                                    <font-awesome-icon
                                        :icon="['fas', 'truck']"
                                        class="icons"
                                        style="color: var(--fifth-color)"
                                    />
                                    Logistic Instruction
                                </p>
                            </template>
                            <template
                                v-else-if="filteredProducts.type === 'SI'"
                            >
                                <p>
                                    <font-awesome-icon
                                        :icon="['fas', 'user-pen']"
                                        class="icons"
                                        style="color: var(--fifth-color)"
                                    />
                                    Service Instruction
                                </p>
                            </template>
                        </div>
                    </div>
                    <div class="list-number card">
                        <div class="information-title">Li No.</div>
                        <div class="information-body">
                            {{ filteredProducts.id }}
                        </div>
                    </div>
                    <div class="transfer-number card">
                        <div class="information-title">Transfer No.</div>
                        <div class="information-body">
                            <span
                                v-for="(
                                    transfer, index
                                ) in filteredProducts.transferNumber"
                                :key="index"
                            >
                                {{ Object.values(transfer)[0] }}
                                <br
                                    v-if="
                                        index <
                                        filteredProducts.transferNumber.length -
                                            1
                                    "
                                />
                            </span>
                        </div>
                    </div>
                    <div class="customer-name card">
                        <div class="information-title">Customer</div>
                        <div class="information-body">
                            {{ filteredProducts.customerName }}
                        </div>
                    </div>
                    <div class="customer-po card">
                        <div class="information-title">Customer PO</div>
                        <div class="information-body">
                            {{ filteredProducts.customerPO }}
                        </div>
                    </div>
                    <div class="status card">
                        <div class="information-title">Status</div>
                        <div class="information-body">
                            {{ filteredProducts.status }}
                        </div>
                    </div>
                </div>
                <div class="information">
                    <div class="pic card">
                        <div class="information-title">Attention of</div>
                        <div class="information-body">
                            {{ filteredProducts.attentionOf }}
                        </div>
                    </div>
                    <div class="vendor card">
                        <div class="information-title">Assigned Vendor</div>
                        <div class="information-body">
                            {{ filteredProducts.assignedVendor }}
                        </div>
                    </div>
                    <div class="vendor-quitation card">
                        <div class="information-title">
                            Vendor Quitation No.
                        </div>
                        <div class="information-body">
                            {{ filteredProducts.quotationNumber }}
                        </div>
                    </div>
                    <div class="vendor-address card">
                        <div class="information-title">Vendor Address</div>
                        <div class="information-body">
                            {{ filteredProducts.vendorAddress }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="card2-container card">
                <h5>Cost Detail</h5>
                <table>
                    <thead>
                        <tr>
                            <td class="table-title">Description</td>
                            <td class="table-title">QTY</td>
                            <td class="table-title">UOM</td>
                            <td class="table-title">Unit Price</td>
                            <td class="table-title">GST (%)</td>
                            <td class="table-title">Currency</td>
                            <td class="table-title"></td>
                            <td class="table-title">Vat Amount</td>
                            <td class="table-title">Sub Total</td>
                            <td class="table-title">Total</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(product, index) in costDetailProducts"
                            :key="index"
                        >
                            <td
                                v-for="(detail, detailIndex) in product[
                                    'detail' + (index + 1)
                                ]"
                                :key="detailIndex"
                            >
                                {{
                                    detail.desc ||
                                    detail.qty ||
                                    detail.uom ||
                                    detail.price ||
                                    detail.gst ||
                                    detail.currency
                                }}
                            </td>
                            <td>
                                <font-awesome-icon
                                    :icon="['fas', 'right-long']"
                                />
                            </td>
                            <td>
                                {{
                                    calculateVAT(
                                        product["detail" + (index + 1)]
                                    )
                                }}
                            </td>
                            <td>
                                {{
                                    calculateSubTotal(
                                        product["detail" + (index + 1)]
                                    )
                                }}
                            </td>
                            <td>
                                {{
                                    calculateTotal(
                                        product["detail" + (index + 1)]
                                    )
                                }}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="attachment-notes">
                    <div class="attachment">
                        <h5 class="attachment-title">Attachment</h5>
                        <ul>
                            <li
                                v-for="(attachment, index) in attachments"
                                :key="index"
                            >
                                {{ attachment.fileName }} -
                                {{ attachment.uploadTime }}
                            </li>
                        </ul>
                        <button
                            type="button"
                            class="attachment-button"
                            @click="addAttachment"
                        >
                            <font-awesome-icon :icon="['fas', 'plus']" />
                            Add Attachment
                        </button>
                        <input
                            ref="fileInput"
                            type="file"
                            accept=".pdf"
                            style="display: none"
                            @change="handleFileChange"
                        />
                    </div>
                    <div class="notes">
                        <h5 class="notes-title">Notes</h5>
                        <div class="notes-card card">haahahhaha</div>
                    </div>
                </div>
            </div>
            <div class="vendor-invoice card">
                <div class="vendor">
                    <div class="vendor-title">
                        <h5>Vendor Invoice</h5>
                        <template v-if="isVendorDropdown === false">
                            <font-awesome-icon
                                :icon="['fas', 'caret-down']"
                                class="vendor-dropdown-trigger"
                                @click="vendorDropdown()"
                            />
                        </template>

                        <template v-else>
                            <font-awesome-icon
                                :icon="['fas', 'caret-up']"
                                class="vendor-dropdown-trigger"
                                @click="vendorDropdown()"
                            />
                        </template>
                    </div>
                </div>
                <template v-if="isVendorDropdown">
                    <div class="vendor-dropdown">
                        <button type="button" onclick="addVendorInvoice">
                            <font-awesome-icon :icon="['fas', 'plus']" />
                            Add Vendor Invoice
                        </button>
                        <div class="vendor-table">
                            <table>
                                <thead>
                                    <tr>
                                        <td>Invoice No.</td>
                                        <td>Invoice Attachment</td>
                                        <td>Supporting Document</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>tes1</td>
                                    <td>tes2</td>
                                    <td>tes3</td>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </template>
            </div>
            
            <h5 class="card3-title">For Internal Only</h5>
            <div class="card3-container card">
                <div class="card3-body">
                    <div class="attachment-internal">
                        Attachment
                        <button type="button" onclick="addAttachment">
                            + Add Attachment
                        </button>
                    </div>
                    <div class="internal-note">
                        Internal Note
                        <button type="button" onclick="addNote">
                            + Add Internal Note
                        </button>
                    </div>
                </div>
            </div>
            View Activity Note
        </div>
    </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";
import Header from "./Header.vue";
import BtnEmailExcel from "./BtnEmailExcel.vue";
import { mapGetters } from "vuex";

export default {
    components: {
        navbar: Navbar,
        sidebar: Sidebar,
        Header,
        BtnEmailExcel,
    },
    data() {
        return {
            isExpanded: false,
            isVendorDropdown: false,
        };
    },

    props: {
        //nerima informasi id dari halaman utama
        id: {
            type: String,
            required: true,
        },
    },

    created() {
        this.$store.dispatch("example/getAllData");
    },

    computed: {
        ...mapGetters({
            products: "example/getData", //minta ke ExampleController.php
        }),
        filteredProducts() {
            return (
                this.products.find((product) => product.id === this.id) || {}
            );
        },
        costDetailProducts() {
            const selectedProduct = this.products.find(
                (product) => product.id === this.id
            );

            return selectedProduct.costDetail;
        },
    },
    methods: {
        backwards() {
            this.$router.go(-1);
        },
        calculateVAT(detail) {
            console.log("detail", detail);

            if (detail.length > 0) {
                const gst = detail.find((item) => item.gst)?.gst || 0;
                const price = detail.find((item) => item.price)?.price || 0;
                const qty = detail.find((item) => item.qty)?.qty || 0;
                const result = (gst * price * qty) / 100;
                return result.toFixed(2);
            }
            return 0;
        },
        calculateSubTotal(detail) {
            console.log("detail di subtotal", detail);
            if (detail.length > 0) {
                const price = detail.find((item) => item.price)?.price || 0;
                const qty = detail.find((item) => item.qty)?.qty || 0;
                const result = price * qty;
                return result.toFixed(2);
            }
            return "0.00";
        },
        calculateTotal(detail) {
            const vat = parseFloat(this.calculateVAT(detail));
            const subTotal = parseFloat(this.calculateSubTotal(detail));

            const result = vat + subTotal;

            return result.toFixed(2);
        },
        addAttachment() {
            this.$refs.fileInput.click();
        },
        vendorDropdown() {
            this.isVendorDropdown = !this.isVendorDropdown;
        },
        /*
        handleFileChange(event) {
            const fileInput = event.target;
            const files = fileInput.files;

            // Loop melalui file yang dipilih
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const isPDF = file.type === "application/pdf";

                if (isPDF) {
                    const uploadTime = new Date().toLocaleString();
                    const attachment = {
                        fileName: file.name,
                        uploadTime: uploadTime,
                    };

                    // Tambahkan attachment ke dalam array
                    this.attachments.push(attachment);
                    this.$forceUpdate();
                } else {
                    // Handle jika file yang diunggah bukan PDF
                    alert("File harus berupa PDF.");
                }
            }

            // Bersihkan nilai input file untuk memungkinkan pemilihan file yang sama
            fileInput.value = "";
        },*/
    },
};
</script>

<style scoped>
:root {
    --first-color: #1d1a39;
    --second-color: #451952;
    --third-color: #662549;
    --fourth-color: #ae445a;
    --fifth-color: #f39f5a;
    ---sixth-color: #e8bcb9;
}

.main-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding-top: min(4rem, 5vw);
    position: relative;
    min-width: 1020px;
    background-color: #ccc;
}

.container {
    min-width: 970px;
    width: calc(100% - 2rem);
    margin-right: 0;
    padding-top: 2rem;
    min-height: 100vh;
}

.container-title {
    font-weight: 550;
}

.container-subtitle {
    display: flex;
    flex-direction: row;
    padding-bottom: 1em;
}

.container-subtitle .subtitle {
    width: 50%;
    display: flex;
    flex-direction: row;
}

.container-subtitle .subtitle-buttons {
    display: flex;
    justify-content: flex-end;
    width: 50%;
    gap: 30px;
}

.subtitle .vendor-management {
    padding-right: 0.55em;
    opacity: 0.7;
}

.subtitle .party-instruction {
    padding-left: 0.55em;
    opacity: 1;
    transition: ease-in-out;
}

.subtitle .vendor-management:hover,
.subtitle .party-instruction:hover {
    cursor: pointer;
    transform: scale(1.01);
    opacity: 1;
    text-decoration: underline;
    color: #662549;
}

.subtitle-buttons .email-button,
.subtitle-buttons .export-button {
    border: 0.6px solid #ccc;
    background-color: white;
    font-size: 90%;
    font-weight: 400;
}

.email-button:hover,
.export-button:hover {
    font-weight: 500;
    background-color: #e8bcb9;
    border: 0.6px solid black;
    transform: scale(1.01);
}

.information-navigation {
    padding: 1em 0.5em;
    display: flex;
    flex-direction: row;
}

.information-navigation .backButton {
    width: 50%;
}

.information-navigation .terminate-modify {
    width: 50%;
    display: flex;
    justify-content: flex-end;
    gap: 30px;
}

.back-button,
.terminate-button,
.modify-button {
    background-color: transparent;
    border: none;
}

.back-button:hover,
.terminate-button:hover,
.modify-button:hover {
    transform: scale(1.05);
}

.card-container {
    display: flex;
    font-size: smaller;
    padding: 0.8rem;
}

.card-container .information {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.card-container .information .card {
    flex-grow: 1;
    width: 16.66667%;
    border: none;
}

.card-container .information .vendor-address {
    flex-grow: 1;
    width: 50%;
}

.information-title {
    display: flex;
    padding: 0 1em;
    width: 100%;
    justify-content: flex-start;
    text-align: left;
    color: rgb(97, 95, 95) ccc;
    font-size: x-small;
}

.information-body {
    display: flex;
    justify-content: flex-start;
    text-align: left;
    font-weight: 600;
    padding: 0 1em;
    flex-direction: column;
}

.transfer-number .information-body span {
    border-radius: 5px;
    margin: 0.2rem 0;
    background-color: var(---sixth-color);
    padding: 0.2rem 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
    cursor: pointer;
}

.transfer-number .information-body span:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: scale(1.02);
}

.vendor-address .information-title {
    width: 100%;
}

/*container ke 2 */

.table-title {
    font-size: larger;
    font-weight: bolder;
}

.card2-container {
    display: flex;
    font-size: smaller;
    padding: 0.8rem;
}

.attachment-notes {
    display: flex;
    flex-direction: row;
    padding-top: 1.5rem;
}

.attachment-notes .attachment,
.attachment-notes .notes {
    width: 50%;
}

.attachment-button,
.vendor-dropdown button {
    color: #090909;
    padding: 0.5rem 1.3rem;
    border-radius: 0.5em;
    background: #e8e8e8;
    border: 1px solid #e8e8e8;
    transition: all 0.3s;
    box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
}

.attachment-button:active,
.vendor-dropdown button:active {
    color: #666;
    box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
}

.notes-card {
    width: 100%;
    background-color: #f5f7f9;
    color: #66686a;
    border: none;
    min-height: 5rem;
    padding: 0.5rem;
}

.vendor-invoice {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
}

.vendor-invoice .vendor-title {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin: 0;
    align-items: center;
}

.vendor-title h5 {
    margin: 0;
    margin-right: 0.7rem;
}

.vendor-dropdown {
    display: flex;
    flex-direction: column;
}

.vendor-dropdown button {
    margin-top: 1rem;
    width: max-content;
}

.vendor-table table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.vendor-table table thead {
    background-color: var(--first-color);
    color: white;
}

.vendor-table table tbody {
    background-color: #f5f5f5;
}

.vendor-table table td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.vendor-table table tbody tr:last-child td {
    border-bottom: none;
}

.vendor-table table tbody tr:hover {
    background-color: #e0e0e0;
    transition: background-color 0.3s ease;
}

.vendor-table table th {
    position: relative;
    cursor: pointer;
}

/*container ke 3 */

.card3-container {
    display: flex;
    padding: 0.8rem;
    border-radius: 0;
    width: 100%;
    margin: 0;
}

.card3-title {
    color: white;
    background-color: var(--first-color);
    width: 100%;
    margin: 0;
    padding: 0.8rem;
    border-radius: 5px 5px 0 0;
}

.card3-container .card3-body {
    display: flex;
    flex-direction: row;
    
}

.card3-container .card3-body .attachment-internal {
    display: flex;
    flex-direction: column;
    width: 50%;
}

.attachment-internal button,
.internal-note button
{
    margin-top: 1rem;
    color: #090909;
    font-size: smaller;
    padding: 0.4rem 1.1rem;
    border-radius: 0.5em;
    background: #e8e8e8;
    border: 1px solid #e8e8e8;
    transition: all 0.3s;
    box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
    width: 10rem;
}

.attachment-internal button:active,
.internal-note button:active
{
    color: #666;
    box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
}

.card3-container .card3-body .internal-note {
    display: flex;
    flex-direction: column;
    width: 50%;
}



@media (max-width: 760px) {
}

@media (min-width: 1440px) {
    .container {
        justify-content: flex-start;
        margin: 0 auto;
    }

    .information-title {
        min-width: 0vw;
    }
}
</style>
