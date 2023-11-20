<template>
    <div class="container">
        <h2>Keranjang Belanja</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Accumulation</th>
                    <th></th>
                    <th></th>
                   
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in carts" :key="product.id">
                    <td>{{ product.name }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.quantity }}</td>
                    <td>{{ product.price * product.quantity }}</td>
                    <td>
                        <button class="button-71" @click="deleteItem(product.id)">
                            Delete
                        </button>
                    </td>
                    
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3">Total</td>
                    <td>{{ calculateTotalPrice() }} </td>
                </tr>
            </tfoot>
        </table>
        <button type="button" @click="goHome">
            Edit Products
        </button>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
   
    computed: {
        ...mapGetters({
            products: "example/getData",
            carts: "example/getCart",
        }),
    },

    methods: {
        deleteItem(productId) {
            const product = this.products.find((p) => p.id === productId);

            this.$store.dispatch('example/deleteCart', productId);
        },

        goHome(){
            this.$router.push({name:'products'})
        },
        calculateTotalPrice(){
            console.log(`harga totalnya adalah ${totalPrice}`)
            let totalPrice = 0;
            this.carts.forEach(product => {
                totalPrice += product.price * product.quantity
            });
            return `Rp${totalPrice}`
        }
    },
};
</script>
