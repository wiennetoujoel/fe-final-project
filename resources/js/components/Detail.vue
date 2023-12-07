<template>
    <navbar />

    <div class="main-container">
        <sidebar />
        <div class="container">
            <div class="container-header">
                <customHeader  :filteredProducts = "filteredProducts"/>
            </div>
         

            <div class="d-flex justify-content-end mb-3">
                <template v-if="filteredProducts.status !== 'Draft'">
                    <BtnEmailExcel />
                    <button
                        type="button"
                        class="export-button"
                        @click="exportToPDF"
                    >
                        <font-awesome-icon
                            :icon="['fas', 'file-export']"
                            style="color: #ae445a"
                        />
                        Export
                    </button>
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
                    <div
                        class="terminate-modify"
                        v-if="
                            filteredProducts.status !== 'Completed' &&
                            filteredProducts.status !== 'Cancelled'
                        "
                    >
                        <button
                            type="button"
                            class="terminate-button"
                            @click="terminate(filteredProducts.status)"
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
                <template v-if="popUpTerminate">
                    <PopUpTerminate
                        :filteredProducts="filteredProducts"
                        @emit-closePopUpTerminate="closePopUpTerminate"
                    />
                </template>
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
                <table class="cost-detail-table">
                    <thead>
                        <tr>
                            <td class="table-title-desc">Description</td>
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
                                :class="{
                                    'non-desc-cell': !detail.desc,
                                    'desc-cell': detail.desc,
                                }"
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
                            <td style="text-align: left">
                                <font-awesome-icon
                                    :icon="['fas', 'right-long']"
                                />
                            </td>
                            <td class="table-calculation">
                                {{
                                    calculateVAT(
                                        product["detail" + (index + 1)]
                                    )
                                }}
                            </td>
                            <td class="table-calculation">
                                {{
                                    calculateSubTotal(
                                        product["detail" + (index + 1)]
                                    )
                                }}
                            </td>
                            <td class="table-calculation">
                                {{
                                    calculateTotal(
                                        product["detail" + (index + 1)]
                                    )
                                }}
                            </td>
                        </tr>

                        <tr
                            v-for="currency in uniqueCurrencies"
                            :key="currency"
                            class="table-by-currency"
                        >
                            <td
                                colspan="5"
                                style="background-color: white"
                            ></td>
                            <td style="text-align: center">{{ currency }}</td>
                            <td style="text-align: left">
                                <font-awesome-icon
                                    :icon="['fas', 'right-long']"
                                />
                            </td>
                            <td style="text-align: center">
                                {{ calculateVATByCurrency(currency) }}
                            </td>
                            <td style="text-align: center">
                                {{ calculateSubTotalByCurrency(currency) }}
                            </td >
                            <td style="text-align: center">
                                {{ calculateTotalByCurrency(currency) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="attachment-notes">
                    <div
                        class="terminated"
                        v-if="
                            filteredProducts.status === 'Cancelled' &&
                            filteredProducts.terminateStatus
                        "
                    >
                        <h5 class="terminated-title">Terminated Info</h5>
                        <div class="terminated-info">
                            Terminated Description
                        </div>
                        <div class="terminated-message">
                            {{
                                filteredProducts.terminateStatus[0]
                                    .terminateMessage
                            }}
                        </div>
                        <div class="terminated-attachment">Attachments</div>
                        <div
                            v-if="
                                filteredProducts.terminateStatus[0]
                                    .vendorAttachment &&
                                filteredProducts.terminateStatus[0]
                                    .vendorAttachment.length > 0
                            "
                        >
                            <ul style="padding: 0">
                                <li
                                    class="attachment-list"
                                    v-for="(
                                        attachment, index
                                    ) in filteredProducts.terminateStatus[0]
                                        .vendorAttachment"
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
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="notes">
                        <h5 class="notes-title">Notes</h5>
                        <div class="notes-card card">
                            {{ filteredProducts.notes }}
                        </div>
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
                        <template
                            v-if="
                                filteredProducts.status !== 'Completed' &&
                                filteredProducts.status !== 'Cancelled'
                            "
                            ><button
                                type="button"
                                @click="vendorInvoice"
                                class="vendor-dropdown-button"
                            >
                                <font-awesome-icon :icon="['fas', 'plus']" />
                                Add Vendor Invoice
                            </button></template
                        >

                        <div class="vendor-table">
                            <table>
                                <thead>
                                    <tr>
                                        <td>Invoice No.</td>
                                        <td>Invoice Attachment</td>
                                        <td>Supporting Document</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-if="
                                            filteredProducts.vendorInvoice
                                                .length < 1
                                        "
                                        class="no-vendor-data"
                                    >
                                        <td
                                            colspan="4"
                                            style="text-align: center"
                                        >
                                            No Data Found
                                        </td>
                                    </tr>
                                    <tr
                                        v-else
                                        v-for="(
                                            invoice, index
                                        ) in filteredProducts.vendorInvoice"
                                        :key="index"
                                    >
                                        <td>{{ invoice.vendorNumber }}</td>
                                        <td>
                                            <div
                                                v-for="(
                                                    attachment, indeks
                                                ) in invoice.vendorAttachment"
                                                :key="indeks"
                                            >
                                                {{ attachment.fileName }}
                                            </div>
                                        </td>
                                        <td>
                                            <span
                                                class="circle"
                                                @mouseover="showVendorDropdown"
                                                @mouseleave="hideVendorDropdown"
                                            >
                                                {{
                                                    invoice.supportingDocument
                                                        .length
                                                }}
                                                <div
                                                    v-if="showingDropdown"
                                                    class="dropdown"
                                                >
                                                    <div
                                                        v-for="(
                                                            document, index
                                                        ) in invoice.supportingDocument"
                                                        :key="index"
                                                        class="dropdown-item"
                                                    >
                                                        {{
                                                            document.documentName
                                                        }}
                                                    </div>
                                                </div>
                                            </span>
                                        </td>
                                        <td>
                                            <div class="vendor-actions-buttons">
                                                <div
                                                    class="delete-vendor-icon"
                                                    @click="
                                                        deleteVendor(
                                                            invoice.vendorNumber
                                                        )
                                                    "
                                                >
                                                    <font-awesome-icon
                                                        :icon="['fas', 'trash']"
                                                    />
                                                </div>

                                                <div
                                                    class="edit-vendor-icon"
                                                    @click="
                                                        editVendor(
                                                            invoice.vendorNumber
                                                        )
                                                    "
                                                >
                                                    <font-awesome-icon
                                                        :icon="[
                                                            'fas',
                                                            'pencil',
                                                        ]"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <template
                                        v-if="
                                            filteredProducts.status !==
                                                'Completed' &&
                                            filteredProducts.status !==
                                                'Cancelled'
                                        "
                                    >
                                        <tr
                                            v-if="
                                                filteredProducts.vendorInvoice
                                                    .length > 0
                                            "
                                        >
                                            <td
                                                colspan="4"
                                                class="vendor-last-row"
                                            >
                                                <div class="vendor-information">
                                                    Click the button if all
                                                    vendor invoices have been
                                                    received
                                                </div>

                                                <div class="vendor-button">
                                                    <button
                                                        type="button"
                                                        @click="
                                                            receivedInvoice(
                                                                filteredProducts.id
                                                            )
                                                        "
                                                    >
                                                        All Received
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <template v-if="popUpReceivedVendor">
                        <PopUpReceivedVendor
                            :filteredProducts="filteredProducts"
                            :terminateId="terminateId"
                            @emit-closePopUpReceivedVendor="
                                closePopUpReceivedVendor
                            "
                        />
                    </template>
                    <template v-if="popUpVendor">
                        <PopUpVendor
                            :editingVendorData="editingVendorData"
                            :filteredProducts="filteredProducts"
                            @emit-closePopUpVendor="closePopUpVendor"
                        />
                    </template>
                    <template v-if="popUpDeleteVendor">
                        <PopUpDeleteVendor
                            :filteredProducts="filteredProducts"
                            :documentIdToDelete="documentIdToDelete"
                            @emit-closePopUpDeleteVendor="
                                closePopUpDeleteVendor
                            "
                        />
                    </template>
                </template>
            </div>

            <h5 class="card3-title">For Internal Only</h5>
            <div class="card3-container card">
                <div class="card3-body">
                    <div class="attachment-internal">
                        Attachment
                        <button type="button" @click="addAttachment">
                            + Add Attachment
                        </button>
                        <div v-if="filteredProducts.attachments.length > 0">
                            <ul>
                                <li
                                    class="attachment-list"
                                    v-for="(
                                        attachment, index
                                    ) in filteredProducts.attachments"
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
                    <div class="internal-note">
                        Internal Note
                        <button type="button" @click="addNote">
                            + Add Internal Note
                        </button>
                        <div v-if="filteredProducts.internalNotes.length > 0">
                            <ul>
                                <li
                                    v-for="note in filteredProducts.internalNotes"
                                    :key="note.id"
                                    class="note-list"
                                >
                                    <div class="note-container">
                                        <div class="note-title">
                                            <div class="note-main-title">
                                                by {{ note.adminName }} on
                                                {{ note.formattedDateTime }}
                                            </div>
                                            <div class="note-buttons">
                                                <div
                                                    class="delete-note"
                                                    @click="deleteNote(note.id)"
                                                >
                                                    <font-awesome-icon
                                                        :icon="['fas', 'trash']"
                                                    />
                                                </div>

                                                <div
                                                    class="edit-note"
                                                    @click="editNote(note.id)"
                                                >
                                                    <font-awesome-icon
                                                        :icon="[
                                                            'fas',
                                                            'pencil',
                                                        ]"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="note-main-container">
                                            {{ note.notes }}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <template v-if="popUpNote">
                        <PopUpNote
                            :filteredProducts="filteredProducts"
                            :editingNoteData="editingNoteData"
                            @emit-closePopUpNote="closePopUpNote"
                        />
                    </template>
                </div>
            </div>
            View Activity Note
            {{ costDetailProducts }}
        </div>
    </div>
    <div class="convert-to-pdf">
        <div id="pdf" ref="document">
            <div class="title-container">
                <div class="company-container">
                    <div class="image-container">
                        <img src="../../images/company.png" />
                    </div>
                </div>
                <div
                    class="instruction-container"
                    v-if="filteredProducts.type === 'SI'"
                >
                    Service Instruction
                </div>
                <div class="instruction-container" v-else>
                    Logistic Instruction
                </div>
            </div>
            <div class="table-1-container">
                <table>
                    <tbody>
                        <tr>
                            <td>Issue By</td>
                            <td>{{ adminName }}</td>
                            <td>Date of Issue</td>
                            <td>{{ formattedDate }}</td>
                        </tr>
                        <tr>
                            <td v-if="filteredProducts.type === 'SI'">
                                SI Number/Rev
                            </td>
                            <td v-else>LI Number/Rev</td>
                            <td>{{ filteredProducts.id }}</td>
                            <td>Transaction No.</td>
                            <td>
                                <span
                                    v-for="(
                                        transfer, index
                                    ) in filteredProducts.transferNumber"
                                    :key="index"
                                >
                                    {{ transfer["transfer" + (index + 1)] }}

                                    {{
                                        index <
                                        filteredProducts.transferNumber.length -
                                            1
                                            ? ", "
                                            : ""
                                    }}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>Customer</td>
                            <td>{{ filteredProducts.customerName }}</td>
                            <td>Customer PO</td>
                            <td>{{ filteredProducts.customerPO }}</td>
                        </tr>
                        <tr>
                            <td>Attention Of</td>
                            <td>{{ filteredProducts.attentionOf }}</td>
                            <td>Vendor Quotation</td>
                            <td>{{ filteredProducts.quotationNumber }}</td>
                        </tr>
                        <tr>
                            <td>Issue To</td>
                            <td>{{ filteredProducts.assignedVendor }}</td>
                            <td>Invoice To</td>
                            <td>{{ filteredProducts.invoiceTo }}</td>
                        </tr>
                        <tr>
                            <td>Vendor Address</td>
                            <td colspan="3">
                                {{ filteredProducts.vendorAddress }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="table-2-container">
                <table>
                    <thead>
                        <tr>
                            <td colspan="7">Detail of Cost</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>Quantity</td>
                            <td>UOM</td>
                            <td>Unit Price</td>
                            <td>GST(%)</td>
                            <td>Currency</td>
                            <td>Total</td>
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
                                :class="{
                                    'non-desc-cell': !detail.desc,
                                    'desc-cell': detail.desc,
                                }"
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
                            <td style="text-align: center">
                                {{
                                    calculateTotal(
                                        product["detail" + (index + 1)]
                                    )
                                }}
                            </td>
                        </tr>
                        <tr
                            v-for="currency in uniqueCurrencies"
                            :key="currency"
                        >
                            <td colspan="4"></td>
                            <td style="text-align: right; font-weight: 600">
                                Grand Total
                            </td>
                            <td style="text-align: center">{{ currency }}</td>
                            <td class="table-calculation" style="text-align: center">
                                {{ calculateTotalByCurrency(currency) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";
import CustomHeader from "./Header.vue";
import BtnEmailExcel from "./BtnEmailExcel.vue";
import { mapGetters } from "vuex";
import PopUpTerminate from "./PopUpTerminate.vue";
import PopUpNote from "./PopUpNote.vue";
import PopUpVendor from "./PopUpVendor.vue";
import PopUpDeleteVendor from "./PopUpDeleteVendor.vue";
import PopUpReceivedVendor from "./PopUpReceivedVendor.vue";

import html2pdf from "html2pdf.js";

export default {
    components: {
        navbar: Navbar,
        sidebar: Sidebar,
        customHeader: CustomHeader,
        BtnEmailExcel,
        PopUpTerminate,
        PopUpNote,
        PopUpVendor,
        PopUpDeleteVendor,
        PopUpReceivedVendor,
    },
    data() {
        return {
            isExpanded: false,
            isVendorDropdown: false,
            popUpTerminate: false,
            popUpNote: false,
            popUpVendor: false,
            showingDropdown: false,
            popUpDeleteVendor: false,
            popUpReceivedVendor: false,
            formattedDate: this.getCurrentDate(),
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
            adminName: "example/adminOnline",
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

        uniqueCurrencies() {
            const currencies = new Set();
            this.costDetailProducts.forEach((product) => {
                Object.values(product).forEach((detail) => {
                    detail.forEach((item) => {
                        if (item.currency) {
                            currencies.add(item.currency);
                        }
                    });
                });
            });
            const uniqueCurrenciesArray = Array.from(currencies);
            console.log("Unique Currencies:", uniqueCurrenciesArray);

            return uniqueCurrenciesArray;
        },
    },
    methods: {
        backwards() {
            this.$router.go(-1);
        },
        calculateVAT(detail) {
            if (detail.length > 0) {
                const gst = detail.find((item) => item.gst)?.gst || 0;
                const price = detail.find((item) => item.price)?.price || 0;
                const qty = detail.find((item) => item.qty)?.qty || 0;
                const result = (gst * price * qty) / 100;

                return this.formatNumber(result);
            }
            return "0.00";
        },
        calculateSubTotal(detail) {
            if (detail.length > 0) {
                const price = detail.find((item) => item.price)?.price || 0;
                const qty = detail.find((item) => item.qty)?.qty || 0;
                const result = price * qty;

                return this.formatNumber(result);
            }
            return "0.00";
        },
        calculateTotal(detail) {
            if (detail.length > 0) {
                const gst = detail.find((item) => item.gst)?.gst || 0;
                const price = detail.find((item) => item.price)?.price || 0;
                const qty = detail.find((item) => item.qty)?.qty || 0;
                const result = (gst * price * qty) / 100 + price * qty;

                return this.formatNumber(result);
            }
            return "0.00";
        },

        calculateVATByCurrency(currency) {
            const values = this.costDetailProducts
                .flatMap((product) => Object.values(product)) // Mengambil array dari setiap nilai properti di objek
                .filter((detail) =>
                    detail.some((item) => item.currency === currency)
                ) // Memfilter detail yang memiliki currency sesuai yang diinginkan
                .map((detail) =>
                    detail.reduce(
                        (acc, item) => {
                            // Filter dan tambahkan hanya jika nilai item tidak sama dengan 0
                            if (
                                item.gst !== undefined &&
                                parseFloat(item.gst) !== 0
                            ) {
                                acc.gst += parseFloat(item.gst) || 0;
                            }
                            if (
                                item.price !== undefined &&
                                parseFloat(item.price) !== 0
                            ) {
                                acc.price += parseFloat(item.price) || 0;
                            }
                            if (
                                item.qty !== undefined &&
                                parseFloat(item.qty) !== 0
                            ) {
                                acc.qty += parseFloat(item.qty) || 0;
                            }
                            return acc;
                        },
                        { gst: 0, price: 0, qty: 0 }
                    )
                )
                .filter(
                    (item) =>
                        item.gst !== 0 || item.price !== 0 || item.qty !== 0
                );

            console.log("values", values);

            const vatResults = values.map((item) => ({
                currency: currency,
                vat: (item.gst * item.price * item.qty) / 100,
            }));

            console.log("vatResults", vatResults);

            // Jika Anda perlu total VAT untuk semua currency, tambahkan langkah ini
            const totalVAT = vatResults.reduce(
                (acc, item) => acc + item.vat,
                0
            );

            console.log("Total VAT for all currencies:", totalVAT);

            return this.formatNumber(totalVAT);
        },

        calculateSubTotalByCurrency(currency) {
            const values = this.costDetailProducts
                .flatMap((product) => Object.values(product)) // Mengambil array dari setiap nilai properti di objek
                .filter((detail) =>
                    detail.some((item) => item.currency === currency)
                ) // Memfilter detail yang memiliki currency sesuai yang diinginkan
                .map((detail) =>
                    detail.reduce(
                        (acc, item) => {
                            // Filter dan tambahkan hanya jika nilai item tidak sama dengan 0
                            if (
                                item.gst !== undefined &&
                                parseFloat(item.gst) !== 0
                            ) {
                                acc.gst += parseFloat(item.gst) || 0;
                            }
                            if (
                                item.price !== undefined &&
                                parseFloat(item.price) !== 0
                            ) {
                                acc.price += parseFloat(item.price) || 0;
                            }
                            if (
                                item.qty !== undefined &&
                                parseFloat(item.qty) !== 0
                            ) {
                                acc.qty += parseFloat(item.qty) || 0;
                            }
                            return acc;
                        },
                        { gst: 0, price: 0, qty: 0 }
                    )
                )
                .filter(
                    (item) =>
                        item.gst !== 0 || item.price !== 0 || item.qty !== 0
                );

            console.log("values", values);

            const subTotalResults = values.map((item) => ({
                currency: currency,
                subTotalCalculation: item.price * item.qty,
            }));

            console.log("subTotalResults", subTotalResults);

            // Jika Anda perlu total VAT untuk semua currency, tambahkan langkah ini
            const subTotal = subTotalResults.reduce(
                (acc, item) => acc + item.subTotalCalculation,
                0
            );

            console.log("Subtotal for all currencies:", subTotal);

            return this.formatNumber(subTotal);
        },

        calculateTotalByCurrency(currency) {
            const values = this.costDetailProducts
                .flatMap((product) => Object.values(product)) // Mengambil array dari setiap nilai properti di objek
                .filter((detail) =>
                    detail.some((item) => item.currency === currency)
                ) // Memfilter detail yang memiliki currency sesuai yang diinginkan
                .map((detail) =>
                    detail.reduce(
                        (acc, item) => {
                            // Filter dan tambahkan hanya jika nilai item tidak sama dengan 0
                            if (
                                item.gst !== undefined &&
                                parseFloat(item.gst) !== 0
                            ) {
                                acc.gst += parseFloat(item.gst) || 0;
                            }
                            if (
                                item.price !== undefined &&
                                parseFloat(item.price) !== 0
                            ) {
                                acc.price += parseFloat(item.price) || 0;
                            }
                            if (
                                item.qty !== undefined &&
                                parseFloat(item.qty) !== 0
                            ) {
                                acc.qty += parseFloat(item.qty) || 0;
                            }
                            return acc;
                        },
                        { gst: 0, price: 0, qty: 0 }
                    )
                )
                .filter(
                    (item) =>
                        item.gst !== 0 || item.price !== 0 || item.qty !== 0
                );

            console.log("values", values);

            const totalResults = values.map((item) => ({
                currency: currency,
                totalEach:
                    (item.gst * item.price * item.qty) / 100 +
                    item.price * item.qty,
            }));

            console.log("totalResults", totalResults);

            // Jika Anda perlu total totalEach untuk semua currency, tambahkan langkah ini
            const total = totalResults.reduce(
                (acc, item) => acc + item.totalEach,
                0
            );

            console.log("Total for all currencies:", total);

            return this.formatNumber(total);
        },

        vendorDropdown() {
            this.isVendorDropdown = !this.isVendorDropdown;
        },

        terminate() {
            this.popUpTerminate = true;
        },
        closePopUpTerminate() {
            this.popUpTerminate = false;
        },

        addAttachment() {
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.addEventListener("change", this.handleFileChange);
            fileInput.click();
        },
        handleFileChange(event) {
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

                //push nilai ke dalam attahcments
                this.filteredProducts.attachments.push({
                    id: idAttachment,
                    adminName: this.adminName,
                    fileName: file.name,
                    timeAdded,
                });
            }
        },

        deleteAttachment(index) {
            this.filteredProducts.attachments.splice(index, 1);
        },

        addNote() {
            this.editingNoteData = null;
            this.popUpNote = true;
        },
        closePopUpNote() {
            this.popUpNote = false;
        },

        deleteNote(noteId) {
            const index = this.filteredProducts.internalNotes.findIndex(
                (note) => note.id === noteId
            );

            if (index !== -1) {
                this.filteredProducts.internalNotes.splice(index, 1);
            }
        },
        editNote(noteId) {
            const noteToEdit = this.filteredProducts.internalNotes.find(
                (note) => note.id === noteId
            );

            console.log("isi dari notetoedit", noteToEdit);

            this.showPopUpNoteWithData(noteToEdit);
        },
        showPopUpNoteWithData(noteData) {
            this.editingNoteData = noteData;
            console.log("noteData", noteData);

            this.popUpNote = true;
        },

        vendorInvoice() {
            this.editingVendorData = [];
            this.popUpVendor = true;

            console.log(
                "nilai editingVendorData ketika di tambah",
                this.editingVendorData
            );
        },
        closePopUpVendor() {
            this.popUpVendor = false;
        },

        showVendorDropdown() {
            this.showingDropdown = true;
        },
        hideVendorDropdown() {
            this.showingDropdown = false;
        },

        deleteVendor(documentId) {
            this.documentIdToDelete = documentId;

            console.log("nilai documentId di deleteVendor", documentId);

            this.popUpDeleteVendor = true;
        },

        editVendor(documentId) {
            const vendorToEdit = this.filteredProducts.vendorInvoice.find(
                (invoice) => invoice.vendorNumber === documentId
            );

            this.showPopUpVendorWithData(vendorToEdit);
        },

        showPopUpVendorWithData(vendorData) {
            this.editingVendorData = vendorData;
            console.log(
                "nilai editingVendorData ketika diedit",
                this.editingVendorData
            );
            this.popUpVendor = true;
        },

        closePopUpDeleteVendor() {
            this.popUpDeleteVendor = false;
        },

        receivedInvoice(id) {
            this.terminateId = id;
            this.popUpReceivedVendor = true;
        },

        closePopUpReceivedVendor() {
            this.popUpReceivedVendor = false;
        },

        exportToPDF() {
            html2pdf(document.getElementById("pdf"), {
                margin: 10,
                filename: "service_instruction.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 5 }, //skala
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            });
        },
        getCurrentDate() {
            const today = new Date();
            const day = String(today.getDate()).padStart(2, "0");
            const month = String(today.getMonth() + 1).padStart(2, "0"); //bulan dari 0, ditambah 1jadinye
            const year = today.getFullYear();

            return `${day}/${month}/${year}`;
        },
        formatNumber(number) {
            return number.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        },
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


.export-button {
    border: 0.6px solid #ccc;
    background-color: white;
    font-size: 90%;
    font-weight: 400;
}

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
.table-title-desc {
    font-size: larger;
    font-weight: bolder;
}
.cost-detail-table tbody tr:nth-child(even) {
    background-color: #ccc;
}

.table-title {
    font-size: larger;
    font-weight: bolder;
    text-align: center;
}

.table-by-currency td {
    background-color: var(---sixth-color);
}

.desc-cell {
    width: 18%;
}

.card2-container {
    display: flex;
    font-size: smaller;
    padding: 0.8rem;
}

.non-desc-cell {
    text-align: center !important;
    width: 11%;
}

.table-calculation {
    text-align: center;
}

.attachment-button,
.vendor-dropdown .vendor-dropdown-button {
    color: #090909;
    padding: 0.5rem 1.3rem;
    border-radius: 0.5em;
    background: #e8e8e8;
    border: 1px solid #e8e8e8;
    transition: all 0.3s;
    box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
}

.vendor-dropdown-trigger {
    cursor: pointer;
}

.attachment-button:active,
.vendor-dropdown .vendor-dropdown-button:active {
    color: #666;
    box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
}

.attachment-notes {
    display: flex;
    flex-direction: row;
    padding-top: 1.5rem;
}

.attachment-notes .terminated,
.attachment-notes .notes {
    width: 50%;
}

.terminated-info,
.terminated-attachment {
    font-weight: 600;
    font-size: 0.9rem;
}

.terminated-attachment {
    margin-top: 0.1rem;
}

.terminated-message {
    background-color: #f5f7f9;
    color: black;
    padding: 0.5rem;
    font-size: 0.8rem;
    width: 90%;
    border-radius: 20px;
}

.notes-card {
    width: 100%;
    background-color: #f5f7f9;
    color: #66686a;
    border: none;
    min-height: 5rem;
    padding: 0.5rem;
}

/*vendor container */

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

.vendor-dropdown .vendor-dropdown-button {
    margin-top: 1rem;
    width: max-content;
}

.no-vendor-data {
    text-align: center;
}

.vendor-table table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin-bottom: 20px;
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

.vendor-table table {
    position: relative;
    height: fit-content;
}

.vendor-last-row {
    padding: 20px;
    text-align: center;
}

.vendor-last-row .vendor-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 1rem;
}

.vendor-button button {
    cursor: pointer;
    color: #090909;
    padding: 0.5rem 1.3rem;
    border-radius: 0.5em;
    background: #e8e8e8;
    border: 1px solid #e8e8e8;
    transition: all 0.3s;
    box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
}

.vendor-button button:active {
    color: #666;
    box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
}

.vendor-button button:hover {
    transform: scale(1.05);
}

.vendor-last-row .vendor-information {
    text-align: center;
}

.circle {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #3498db;
    color: #fff;
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
    position: relative;
}

.dropdown {
    position: absolute;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 5px;
    display: none;
    z-index: 700;
    height: fit-content;
    color: black;
}

.circle:hover .dropdown {
    border-radius: 10px;
    position: absolute;
    background-color: #f5f5f5;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: 1px solid #ccc;
    padding: 8px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    font-size: smaller;
}

.dropdown-item {
    padding: 0.3rem;
    cursor: pointer;
}

.dropdown-item:hover {
    background-color: #e0e0e0;
    transition: background-color 0.3s ease;
    transform: scale(1.01);
    border-radius: 17px;
}

.vendor-actions-buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.vendor-actions-buttons .delete-vendor-icon {
    color: rgb(192, 15, 15);
    cursor: pointer;
}

.vendor-actions-buttons .delete-vendor-icon:hover {
    color: red;
    transform: scale(1.01);
}

.vendor-actions-buttons .edit-vendor-icon {
    color: rgb(7, 150, 7);
    cursor: pointer;
}

.vendor-actions-buttons .edit-vendor-icon:hover {
    color: rgb(8, 243, 8);
    transform: scale(1.01);
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
.internal-note button {
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
.internal-note button:active {
    color: #666;
    box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
}

.card3-container .card3-body .internal-note {
    display: flex;
    flex-direction: column;
    width: 50%;
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

.note-list {
    list-style: none;
    margin-top: 0.5rem;
}

.note-container {
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 0.5rem;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.note-title {
    display: flex;
    font-size: smaller;
    color: #333;
}

.note-buttons {
    display: flex;
    margin-left: auto;
    padding: 0 1rem;
    gap: 0.8rem;
}

.delete-note {
    color: rgb(192, 15, 15);
    cursor: pointer;
}

.delete-note:hover {
    color: red;
    transform: scale(1.01);
}

.edit-note {
    color: rgb(7, 150, 7);
    cursor: pointer;
}

.edit-note:hover {
    color: rgb(8, 243, 8);
    transform: scale(1.01);
}

.note-main-container {
    color: black;
    padding: 0.5rem;
    border-radius: 20px;
    background-color: #f0eded;
}

.convert-to-pdf {
    z-index: 999;
    display: none;
}

.title-container {
    display: flex;
    width: 100%;
    flex-direction: row;
}

.company-container {
    width: 60%;
    display: flex;
    background-color: white;
    justify-content: flex-start;
    align-items: flex-start;
    box-sizing: none;
}

.instruction-container {
    background-color: white;
    width: 40%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    font-size: 1.5rem;
    border-left: 5px solid #cae9f3;
    padding: 1rem;
}

.image-container {
    background-color: transparent;
    padding: 1rem;
}
.image-container img {
    width: 50%;
}

.table-1-container {
    padding-top: 1rem;
    background-color: white;
}

.table-1-container table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;

    font-family: "Montserrat", sans-serif;
}

.table-1-container table tr td {
    border: 0.6px solid black;
    padding: 5px;
    text-align: left;
}

.table-1-container table tr td:nth-child(odd) {
    font-weight: 600;
}

.table-1-container table tr td:nth-child(even) {
    font-weight: 400;
}

.table-2-container {
    padding-top: 1rem;
}

.table-2-container table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    font-family: "Montserrat", sans-serif;
}

.table-2-container table tr td {
    border: 0.6px solid black;
    padding: 5px;
    text-align: left;
}

.table-2-container table thead tr td {
    font-weight: 600;
    text-align: center;
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
