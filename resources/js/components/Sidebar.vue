<template>
    <div
        @click="toggleSidebar"
        :class="[
            { 'sidebar-expanded': isExpanded },
            'side-bar',
            'sidebar-transition',
        ]"
    >
        <div class="list">
            <font-awesome-icon
                :icon="['fas', 'computer']"
                class="sidebar-icon"
            />
            <p class="sidebar-label">Dashboard</p>
        </div>
        <div class="list">
            <font-awesome-icon
                :icon="['far', 'compass']"
                class="sidebar-icon"
            />
            <p class="sidebar-label">Market Index</p>
        </div>
        <div class="list">
            <font-awesome-icon
                :icon="['fas', 'helmet-safety']"
                class="sidebar-icon"
            />
            <p class="sidebar-label">Quality & HSE</p>
        </div>
        <div class="list">
            <font-awesome-icon :icon="['fas', 'coins']" class="sidebar-icon" />
            <p class="sidebar-label">Commercial</p>
        </div>
        <div class="list">
            <font-awesome-icon
                :icon="['fas', 'person-digging']"
                class="sidebar-icon"
            />
            <p class="sidebar-label">Procurement</p>
        </div>
        <div class="list">
            <font-awesome-icon
                :icon="['fas', 'warehouse']"
                class="sidebar-icon"
            />
            <p class="sidebar-label">Inventory</p>
        </div>
        <div class="list" @click="toggle3rdParty">
            <font-awesome-icon :icon="['fas', 'users']" class="sidebar-icon" />
            <p class="sidebar-label">
                Vendor Management
                <font-awesome-icon
                    v-if="is3rdPartyVisible"
                    :icon="['fas', 'angle-up']"
                    class="third-icon"
                />
                <font-awesome-icon
                    v-else
                    :icon="['fas', 'angle-down']"
                    class="third-icon"
                />
            </p>
        </div>
        <div v-if="is3rdPartyVisible" class="third-party-options list">
            <font-awesome-icon :icon="['far', 'handshake']" />
            <p class="sidebar2-label">3rd Party Instruction</p>
        </div>

        <div class="list">
            <font-awesome-icon :icon="['fas', 'gears']" class="sidebar-icon" />
            <p class="sidebar-label">Production</p>
        </div>

        <div class="list">
            <font-awesome-icon
                :icon="['fas', 'chart-line']"
                class="sidebar-icon"
            />
            <p class="sidebar-label">KPI & Report</p>
        </div>
        <div class="list">
            <font-awesome-icon :icon="['fas', 'share']" class="sidebar-icon" />
            <p class="sidebar-label">MI Share</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isExpanded: false,
            is3rdPartyVisible: false,
        };
    },
    mounted() {
        document.addEventListener("click", this.handleClickOutside);
    },
    beforeDestroy() {
        document.removeEventListener("click", this.handleClickOutside);
    },
    methods: {
        toggleSidebar() {
            if (this.is3rdPartyVisible) {
                this.is3rdPartyVisible = !this.is3rdPartyVisible;
            }

            this.isExpanded = !this.isExpanded;
        },
        toggle3rdParty() {
            if (this.isExpanded) {
                this.is3rdPartyVisible = !this.is3rdPartyVisible;
                event.stopPropagation();
            }
        },

        handleClickOutside(event) {
            if (!event.target.closest(".sidebar-expanded")) {
                this.is3rdPartyVisible = false;

                if (this.is3rdPartyVisible) {
                    setTimeout(() => {
                        this.isExpanded = false;
                    }, 300);
                } else {
                    this.isExpanded = false;
                }
            }
        },
    },
};
</script>

<style scoped>
.side-bar {
    float: left;
    position: fixed;
    z-index: 100;
    top: min(4rem, 5vw);
    left: 0;
    bottom: 0;
    padding: 0.4rem;
    overflow-x: hidden;
    width: 2.2rem;
    height: 100vw;
    padding-top: 2rem;

    background-color: white;

    display: flex;
    flex-direction: column;

    cursor: pointer;
}

.list {
    display: flex;
    align-items: center;
    border-radius: 30px;
}

.sidebar-icon {
    min-width: 1.5rem;
}

.third-icon {
    padding-left: 0.5rem;
}

.sidebar-label {
    margin: 0;
    padding: 0.5rem;
    display: flex;
    min-width: 10rem;
    align-items: center;
}

.sidebar-expanded {
    position: fixed;
    z-index: 1;
    height: 100vw;
    padding: 0.45em;
    cursor: pointer;
    padding-top: 2rem;
    width: 13rem;

    background-color: white;
}

.sidebar-transition {
    transition: width 0.3s ease-in-out;
}

.sidebar-expanded .list:hover {
    transform: scale(1.05);
    background-color: #bdbaba;
    transition: transform 0.1s ease;
}

.third-party-options {
    display: flex;
    align-items: center;
    border-radius: 30px;
    justify-content: center;

    opacity: 1;
}

.sidebar2-label {
    margin: 0;
    padding: 0.5rem;
    display: flex;
    min-width: 7rem;
    align-items: center;
    font-size: smaller;
}
</style>
