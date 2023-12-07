<template>
    <navbar />

    <div class="main-container">
        <sidebar />

        <div class="container">
            <Header />

            <div class="card-container card" type="card">
                <div class="information-navigation">
                    <div class="filterButton">
                        <button
                            type="button"
                            class="open-button"
                            @click="filterData('In-Progress', 'Draft')"
                            :class="{ active: isActiveOpenButton }"
                        >
                            Open
                        </button>
                        <button
                            type="button"
                            class="completed-button"
                            @click="filterData('Completed', 'Cancelled')"
                            :class="{ active: isActiveCompletedButton }"
                        >
                            Completed
                        </button>
                    </div>

                    <div class="search-export">
                        <!--Source search dari dari internet, https://uiverse.io/krlozCJ/splendid-starfish-73-->
                        <div class="searchContainer">
                            <input
                                v-model="searchTerm"
                                type="text"
                                name="text"
                                class="input"
                                required=""
                                placeholder="Type to search..."
                            />
                            <div class="icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="ionicon"
                                    viewBox="0 0 512 512"
                                >
                                    <title>Search</title>
                                    <path
                                        d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-miterlimit="10"
                                        stroke-width="32"
                                    ></path>
                                    <path
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-miterlimit="10"
                                        stroke-width="32"
                                        d="M338.29 338.29L448 448"
                                    ></path>
                                </svg>
                            </div>
                        </div>

                        <button type="button" class="export-button">
                            <font-awesome-icon
                                :icon="['fas', 'file-export']"
                                style="color: #0dcaf0"
                                @click="exportToExcel"
                            />
                            Export
                        </button>
                    </div>
                </div>
            </div>

            <div class="card2-container card">
                <div class="dropdown-trigger">
                    <button
                        type="button"
                        class="btn btn-info create-third-party"
                        @click="toggleDropdown"
                    >
                        <font-awesome-icon :icon="['fas', 'plus']" />
                        Create 3rd Party Instruction
                    </button>
                    <!-- <div
                        v-if="isDropdownVisible"
                        class="dropdown"
                        ref="dropdown"
                    >
                        <ul class="dropdownActive">
                            <li @click="this.$router.push('/create')" class="options">
                                <font-awesome-icon
                                    :icon="['fas', 'truck']"
                                    class="icons"
                                />
                                Logistic Instruction
                            </li>
                            <li @click="selectOption('SI')" class="options">
                                <font-awesome-icon
                                    :icon="['fas', 'user-pen']"
                                    class="icons"
                                />
                                Service Instruction
                            </li>
                        </ul>
                    </div> -->
                    <div
                        v-if="isDropdownVisible"
                        ref="dropdown"
                        class="dropdown"
                    >
                        <ul>
                            <div
                                @click="this.$router.push('/create')"
                                class="options"
                            >
                                <font-awesome-icon
                                    :icon="['fas', 'truck']"
                                    class="me-2"
                                />
                                Logistic Instruction
                            </div>
                            <div @click="selectOption('SI')" class="options">
                                <font-awesome-icon
                                    :icon="['fas', 'user-pen']"
                                    class="me-2"
                                />
                                Service Instruction
                            </div>
                        </ul>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <td>
                                <div class="header-title">
                                    <div class="header-label">
                                        Instruction Id
                                    </div>
                                    <div class="sort-symbol">
                                        <div
                                            class="sort-up"
                                            :class="{
                                                active:
                                                    sortBy === 'id' &&
                                                    sortOrder === 'asc',
                                            }"
                                            @click="sortTable('id', 'asc')"
                                        ></div>
                                        <div
                                            class="sort-down"
                                            :class="{
                                                active:
                                                    sortBy === 'id' &&
                                                    sortOrder === 'desc',
                                            }"
                                            @click="sortTable('id', 'desc')"
                                        ></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="header-title">
                                    <div class="header-label">Link To</div>
                                    <div class="sort-symbol">
                                        <div
                                            class="sort-up"
                                            :class="{
                                                active:
                                                    sortBy ===
                                                        'transferNumber' &&
                                                    sortOrder === 'asc',
                                            }"
                                            @click="
                                                sortTable(
                                                    'transferNumber',
                                                    'asc'
                                                )
                                            "
                                        ></div>

                                        <div
                                            class="sort-down"
                                            :class="{
                                                active:
                                                    sortBy ===
                                                        'transferNumber' &&
                                                    sortOrder === 'desc',
                                            }"
                                            @click="
                                                sortTable(
                                                    'transferNumber',
                                                    'desc'
                                                )
                                            "
                                        ></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="header-title">
                                    <div class="header-label">
                                        Instruction Type
                                    </div>
                                    <div class="sort-symbol">
                                        <div
                                            class="sort-up"
                                            :class="{
                                                active:
                                                    sortBy === 'type' &&
                                                    sortOrder === 'asc',
                                            }"
                                            @click="sortTable('type', 'asc')"
                                        ></div>
                                        <div
                                            class="sort-down"
                                            :class="{
                                                active:
                                                    sortBy === 'type' &&
                                                    sortOrder === 'desc',
                                            }"
                                            @click="sortTable('type', 'desc')"
                                        ></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="header-title">
                                    <div class="header-label">
                                        Assigned Vendor
                                    </div>
                                    <div class="sort-symbol">
                                        <div
                                            class="sort-up"
                                            :class="{
                                                active:
                                                    sortBy ===
                                                        'assignedVendor' &&
                                                    sortOrder === 'asc',
                                            }"
                                            @click="
                                                sortTable(
                                                    'assignedVendor',
                                                    'asc'
                                                )
                                            "
                                        ></div>
                                        <div
                                            class="sort-down"
                                            :class="{
                                                active:
                                                    sortBy ===
                                                        'assignedVendor' &&
                                                    sortOrder === 'desc',
                                            }"
                                            @click="
                                                sortTable(
                                                    'assignedVendor',
                                                    'desc'
                                                )
                                            "
                                        ></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="header-title">
                                    <div class="header-label">Attention Of</div>
                                    <div class="sort-symbol">
                                        <div
                                            class="sort-up"
                                            :class="{
                                                active:
                                                    sortBy === 'attentionOf' &&
                                                    sortOrder === 'asc',
                                            }"
                                            @click="
                                                sortTable('attentionOf', 'asc')
                                            "
                                        ></div>
                                        <div
                                            class="sort-down"
                                            :class="{
                                                active:
                                                    sortBy === 'attentionOf' &&
                                                    sortOrder === 'desc',
                                            }"
                                            @click="
                                                sortTable('attentionOf', 'desc')
                                            "
                                        ></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="header-title">
                                    <div class="header-label">
                                        Quotation No.
                                    </div>
                                    <div class="sort-symbol">
                                        <div
                                            class="sort-up"
                                            :class="{
                                                active:
                                                    sortBy ===
                                                        'quotationNumber' &&
                                                    sortOrder === 'asc',
                                            }"
                                            @click="
                                                sortTable(
                                                    'quotationNumber',
                                                    'asc'
                                                )
                                            "
                                        ></div>
                                        <div
                                            class="sort-down"
                                            :class="{
                                                active:
                                                    sortBy ===
                                                        'quotationNumber' &&
                                                    sortOrder === 'desc',
                                            }"
                                            @click="
                                                sortTable(
                                                    'quotationNumber',
                                                    'desc'
                                                )
                                            "
                                        ></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="header-title">
                                    <div class="header-label">Customer PO</div>
                                    <div class="sort-symbol">
                                        <div
                                            class="sort-up"
                                            :class="{
                                                active:
                                                    sortBy === 'customerPO' &&
                                                    sortOrder === 'asc',
                                            }"
                                            @click="
                                                sortTable('customerPO', 'asc')
                                            "
                                        ></div>
                                        <div
                                            class="sort-down"
                                            :class="{
                                                active:
                                                    sortBy === 'customerPO' &&
                                                    sortOrder === 'desc',
                                            }"
                                            @click="
                                                sortTable('customerPO', 'desc')
                                            "
                                        ></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="header-title">
                                    <div class="header-label">Status</div>
                                    <div class="sort-symbol">
                                        <div
                                            class="sort-up"
                                            :class="{
                                                active:
                                                    sortBy === 'status' &&
                                                    sortOrder === 'asc',
                                            }"
                                            @click="sortTable('status', 'asc')"
                                        ></div>
                                        <div
                                            class="sort-down"
                                            :class="{
                                                active:
                                                    sortBy === 'status' &&
                                                    sortOrder === 'desc',
                                            }"
                                            @click="sortTable('status', 'desc')"
                                        ></div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <template
                            v-if="sortedProducts[0] === 'No data\'s found'"
                        >
                            <tr>
                                <td colspan="8">No Data's Found</td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr
                                v-for="product in sortedProducts"
                                :key="product.id"
                                @click="toDetailPage(product.id)"
                            >
                                <td class="products">
                                    {{ product.id }}
                                </td>
                                <td class="products">
                                    <span
                                        v-for="(
                                            transfer, index
                                        ) in product.transferNumber"
                                        :key="index"
                                    >
                                        {{ transfer["transfer" + (index + 1)] }}

                                        <!--pemberian tanda koma dan spasi-->
                                        {{
                                            index <
                                            product.transferNumber.length - 1
                                                ? ", "
                                                : ""
                                        }}
                                    </span>
                                </td>
                                <td class="products">
                                    {{ product.type }}
                                </td>
                                <td class="products">
                                    {{ product.assignedVendor }}
                                </td>
                                <td class="products">
                                    {{ product.attentionOf }}
                                </td>
                                <td class="products">
                                    {{ product.quotationNumber }}
                                </td>
                                <td class="products">
                                    {{ product.customerPO }}
                                </td>
                                <td class="products">
                                    {{ product.status }}
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";
import Header from "./Header.vue";
import { mapGetters } from "vuex";
import * as XLSX from "xlsx";

export default {
    components: {
        navbar: Navbar,
        sidebar: Sidebar,
        Header,
    },
    data() {
        return {
            isExpanded: false,
            filterStatus: ["In-Progress", "Draft"],
            isActiveOpenButton: true,
            isActiveCompletedButton: false,
            sortBy: "id", // Default sort column
            sortOrder: "asc", // Default sort order
            searchTerm: "",
            isDropdownVisible: false,
        };
    },

    created() {
        this.$store.dispatch("example/getAllData");
    },

    computed: {
        ...mapGetters({
            products: "example/getData", //minta ke getters
        }),

        filteredProducts() {
            return this.products.filter((product) =>
                this.filterStatus.includes(product.status)
            );
        },
        sortedProducts() {
            console.log(this.sortBy);
            console.log(this.sortOrder);

            const searchLowerCase = this.searchTerm.toLowerCase();

            const sortedAndFilteredProducts = this.filteredProducts
                .slice()
                .sort((a, b) => {
                    if (this.sortBy === "transferNumber") {
                        const transferA =
                            a.transferNumber[0].transfer1.toUpperCase();
                        const transferB =
                            b.transferNumber[0].transfer1.toLowerCase();

                        if (this.sortOrder === "asc") {
                            return transferA.localeCompare(transferB);
                        } else {
                            return transferB.localeCompare(transferA);
                        }
                    } else {
                        const nameA = a[this.sortBy].toUpperCase();
                        const nameB = b[this.sortBy].toLowerCase();

                        if (this.sortOrder === "asc") {
                            return nameA.localeCompare(nameB);
                        } else {
                            return nameB.localeCompare(nameA);
                        }
                    }
                })
                .filter((product) => {
                    // pencarian berdasarkan kriteria
                    return (
                        product.id.toLowerCase().includes(searchLowerCase) ||
                        product.transferNumber.some((transfer) =>
                            Object.values(transfer).some((value) =>
                                value.toLowerCase().includes(searchLowerCase)
                            )
                        ) ||
                        product.type.toLowerCase().includes(searchLowerCase) ||
                        product.assignedVendor
                            .toLowerCase()
                            .includes(searchLowerCase) ||
                        product.attentionOf
                            .toLowerCase()
                            .includes(searchLowerCase) ||
                        product.quotationNumber
                            .toLowerCase()
                            .includes(searchLowerCase) ||
                        product.customerPO
                            .toLowerCase()
                            .includes(searchLowerCase) ||
                        product.status.toLowerCase().includes(searchLowerCase)
                    );
                });
            return sortedAndFilteredProducts;
        },
    },
    methods: {
        filterData(...statuses) {
            this.filterStatus = statuses; //statuses berisi status yan gdikirim dari open dan completed button untuk menentukan mana yang aktif

            this.isActiveOpenButton =
                statuses.includes("In-Progress") && statuses.includes("Draft");
            this.isActiveCompletedButton =
                statuses.includes("Completed") &&
                statuses.includes("Cancelled");
        },
        sortTable(column, order) {
            if (this.sortBy === column) {
                // kolom yang sama di-klik akan ubah sortOrder
                this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
            } else {
                // kolom yang berbeda di-klik akan atur sortBy ke kolom baru, sortOrder disesuaikan dengan updatean terbaru
                this.sortBy = column;
                this.sortOrder = order;
            }
            console.log("isi sortOrder luar else : ", this.sortOrder);
        },

        toggleDropdown() {
            this.isDropdownVisible = !this.isDropdownVisible;

            /*//tambahin kondisi saat dropdown true, semua aktivitas diluar elemen dropdown akan membuat dropdown hilang
            if (this.isDropdownVisible){
                document.addEventListener("click", this.handleClickOutside);
            }else{
                document.removeEventListener("click", this.handleClickOutside)
            }*/

            console.log("dropdown? ", this.isDropdownVisible);
        },

        /*handleClickOutside(event) {
            //nyari ref dengan nilai dropdown
            const dropdown = this.$refs.dropdown;

            console.log("nilai dropdown", dropdown);

            if (dropdown && !dropdown.contains(event.target)) {
                this.isDropdownVisible = false;
                document.removeEventListener("click", this.handleClickOutside);
            }
        },*/

        toDetailPage(productId) {
            this.$router.push({ name: "detail", params: { id: productId } });
            console.log("response");
        },
        exportToExcel() {
            console.log("export to excel response")
            const ws = XLSX.utils.json_to_sheet(
                this.formatDataForExport(this.filteredProducts)
            );
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

            /* generate XLSX file*/
            XLSX.writeFile(wb, "file_excel.xlsx");
        },

        formatDataForExport(data) {
            //  kasus transferNumber yang berbeda
            return data.map((item) => {
                const transferNumbers = item.transferNumber || [];
                const transferValues = transferNumbers.map(
                    (t) => Object.values(t)[0]
                );

                return {
                    ...item,
                    transferNumber: transferValues.join(", "), // Gabungkan nilai transferNumber menjadi satu string
                };
            });
        },

        selectOption(option) {},
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

.card-container {
    display: flex;
    font-size: smaller;
}

.card2-container table {
    margin-bottom: 1rem;
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

.searchContainer {
    position: relative;
    --size-button: 30px;
    color: black;
}

.input {
    padding-left: var(--size-button);
    height: var(--size-button);
    /* height: 30px; */
    font-size: 12px;
    border: none;
    color: black;
    outline: none;
    width: var(--size-button);
    transition: all ease 0.3s;
    background-color: #ffffff; /* Ganti dengan warna putih atau warna cerah lainnya */
    box-shadow: 1.5px 1.5px 3px rgba(0, 0, 0, 0.1),
        -1.5px -1.5px 3px rgba(0, 0, 0, 0.1),
        inset 0px 0px 0px rgba(0, 0, 0, 0.1),
        inset 0px -0px 0px rgba(0, 0, 0, 0.1);
    border-radius: 50px;
    cursor: pointer;
}

.input:focus,
.input:not(:invalid) {
    width: 200px;
    cursor: text;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1),
        inset 1.5px 1.5px 3px rgba(0, 0, 0, 0.1),
        inset -1.5px -1.5px 3px rgba(0, 0, 0, 0.1);
}

.input:focus + .icon,
.input:not(:invalid) + .icon {
    pointer-events: all;
    cursor: pointer;
}

.searchContainer .icon {
    position: absolute;
    width: var(--size-button);
    height: var(--size-button);
    bottom: 8%;
    right: 1%;
    padding: 4.5px;
    pointer-events: none;
}

.searchContainer .icon svg {
    width: 100%;
    height: 100%;
}

.subtitle .vendor-management:hover,
.subtitle .party-instruction:hover {
    cursor: pointer;
    transform: scale(1.01);
    opacity: 1;
    text-decoration: underline;
    color: #662549;
}

.export-button {
    border: 0.6px solid #ccc;
    background-color: white;
    font-size: 14.4px;
    font-weight: 400;
    padding: 4px 12px;
    border-radius: 4px;
}

.export-button:hover {
    font-weight: 500;
    background-color: #e8bcb9;
    border: 0.6px solid black;
    transform: scale(1.03);
}

.information-navigation {
    display: flex;
    align-items: center;
    height: 3vw;
    min-height: 2.5rem;
    max-height: 4rem;
}

.information-navigation .filterButton {
    display: flex;
    height: 100%;
    gap: 10px;
    width: 50%;
    padding-left: 1rem;
}

.dropdown-trigger {
    width: fit-content;
    max-width: 17rem;
    margin-left: auto;
    border: none;
    font-size: smaller;

    font-weight: lighter;
    margin-top: 1rem;
    margin-right: 0.5rem;
    margin-bottom: 1rem;
}
.create-third-party {
    color: white;
}
.dropdown ul {
    position: absolute;
    border: 1px solid rgba(148, 148, 148, 0.571);
    border-radius: 4px;
    list-style-type: none;
    width: 100%;
    font-size: smaller;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-left: 0;
    background-color: white;
}
.options {
    padding: 0.6rem 0.8rem;
    cursor: pointer;
    font-size: 14.4px;
}
.options:hover {
    background-color: #c1c1c1;
}
.information-navigation .filterButton .open-button,
.information-navigation .filterButton .completed-button {
    font-size: 1rem;
    height: 100%;
    min-width: 5rem;
    border: none;
    background-color: transparent;
    border-bottom: 0.2rem solid transparent;

    transition: 0.3s ease-in-out;
}
.open-button.active,
.completed-button.active {
    border-bottom-color: var(---sixth-color) !important;
}
.information-navigation .search-export {
    width: 50%;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding-right: 1rem;
}
table {
    margin: 0 auto;
    width: 98%;
    border-collapse: collapse;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    text-align: center;
    transition: height 0.3 ease;
}
thead tr {
    width: fit-content;
    padding: 0;
}
thead tr td {
    background-color: #f5f5f5;
    flex: content;
    padding: 12px 12px 12px 12px;
    font-weight: 500;
    margin: 0;
}
tbody tr td {
    padding: 12px;
    border-bottom: 1px solid black;
    cursor: pointer;
    font-size: smaller;
}
tbody tr:last-child td {
    border: 0px !important;
}
tbody tr:hover {
    background-color: #f2f2f2;
    transition: background-color 0.3s ease;
}
.header-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: transparent;
    justify-content: center;
    font-size: smaller;
}
.sort-symbol {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0;
    padding: 0 0 0 0.3rem;
    justify-content: center;
}

.sort-up {
    width: 0;
    height: 0;
    border: solid 5px transparent;
    background: transparent;
    border-bottom: solid 7px black;
    border-top-width: 0;
    cursor: pointer;
}

.sort-up:hover {
    border-bottom-color: white;
}

.sort-down {
    width: 0;
    height: 0;
    border: solid 5px transparent;
    background: transparent;
    border-top: solid 7px black;
    border-bottom-width: 0;
    margin-top: 1px;
    cursor: pointer;
}

.sort-down:hover {
    border-top-color: white;
}

.sort-up.active,
.sort-down.active {
    border-bottom-color:#8f8e8e;
    border-top-color: #8f8e8e;
}

@media (min-width: 1600px) {
    .container {
        margin: 0 auto;
    }
}
</style>
