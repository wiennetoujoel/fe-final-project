<template>
    <navbar />

    <div class="main-container">
        <sidebar />
        <div class="container">
            <Header />
            <div class="d-flex justify-content-end mb-3">
                <BtnEmailExcel />
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
                            {{ filteredProducts.transferNumber }}   
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
                            <td class="table-title"></td>
                            <td class="table-title">Currency</td>
                            <td class="table-title">Vat Amount</td>
                            <td class="table-title"> Sub Total</td>
                            <td class="table-title">Total</td>   
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ filteredProducts.desc}}</td>
                            <td>{{ filteredProducts.qty }}</td>
                            <td>{{ filteredProducts.uom }}</td>
                            <td>{{ filteredProducts.price }}</td>
                            <td>{{ filteredProducts.gst }}</td>
                            <td><font-awesome-icon :icon="['fas', 'right-long']" /></td>
                            <td>{{ filteredProducts.currency}}</td>
                            <td>{{ filteredProducts.price * filteredProducts.gst / 100 }}</td>
                            <td>{{ filteredProducts.qty * filteredProducts.price }}</td>
                            <td>{{ filteredProducts.price * filteredProducts.gst / 100 + filteredProducts.qty * filteredProducts.price }}</td>
                        </tr>
                        <tr>
                            <td colspan="6">Exchange Rate 1 USD = 3.657 AED</td>
                            <td>AED (total)</td>
                            <td>70,00</td>
                            <td>1400,00</td>
                            <td>1470,00</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>AED (total)</td>
                            <td>70,00</td>
                            <td>1400,00</td>
                            <td>1470,00</td>
                        </tr>
                    </tbody>
                </table>
                <div class="attachment-notes">
                    <div class="attachment">Attachment</div>
                    <div class="notes">Notes</div>
                </div>
            </div>
            <div class="vendor-invoice">
                <div class="vendor-title">Vendor Invoice</div>
                <button type="button" onclick="addVendorInvoice">
                    + Add Vendor Invoice
                </button>
            </div>
            <div class="card3-container card">
                <div class="card3-title">For Internal Only</div>

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
import Header from "./Header.vue"
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
            return this.products.find((product) => product.id === this.id);
        },
    },
    methods: {
        backwards() {
            this.$router.go(-1);
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
}

.vendor-address .information-title {
    width: 100%;
}







.table-title{
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
}

.attachment-notes .attachment {
    width: 50%;
}

.vendor-invoice {
    display: flex;
    flex-direction: row;
}

.vendor-invoice .vendor-title {
    width: 60%;
}






















.card3-container {
    display: flex;
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
