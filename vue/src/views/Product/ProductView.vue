<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h4>Mahsulotlar
          <RouterLink to="/products/create" class="btn btn-primary float-end">Mahsulot qo'shish</RouterLink>
        </h4>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
          <tr>
            <td>ID</td>
            <td>Name uz</td>
            <td>Cost</td>
            <td>Address</td>
            <td>Product Type</td>
            <td>Created At</td>
            <td>Action</td>
          </tr>
          </thead>
          <tbody v-if="this.products.length > 0">
          <tr v-for="(item,index) in this.products" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.name_uz }}</td>
            <td>{{ item.cost }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.product_type_id }}</td>
            <td>{{ item.created_date }}</td>
            <td class="d-flex justify-content-around">
              <RouterLink :to="{path:'/products/'+item.id}" class="btn btn-success">Edit</RouterLink>
              <button type="button" @click='deleteProduct(item.id)' class="btn btn-danger">Remove</button>
            </td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr>
            <td colspan="7" align="center">Loading ...</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div>
        <ul style="display: flex; gap: 20px">
          <button v-for="(item, index) in paginatedItems" :key="item" @click="getData(index + 1)">{{
              index + 1
            }}
          </button>
        </ul>
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <button @click="nextPage" :disabled="currentPage * itemsPerPage >=total">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'products',
  data() {
    return {
      total: 0,
      products: [],
      currentPage: 1, // Current page
      itemsPerPage: 5, // Items per page
    }
  },
  mounted() {

    this.getProducts();
  },
  methods: {
    getTotal() {
      axios.get(`http://94.158.54.194:9092/api/product`).then(res => {
        this.total = res.data.length
      });
    },
    getProducts(page = null) {
      const pageNum = page || this.currentPage
      axios.get(`http://94.158.54.194:9092/api/product?page=${pageNum}&perPage=${this.itemsPerPage}`).then(res => {
        this.products = res.data.sort((a, b) => a.id > b.id ? 1 : -1)
      });
    },
    deleteProduct(productId) {
      if (confirm('Ochirishga ishonchiz komilmi?')) {
        axios.delete(`http://94.158.54.194:9092/api/product/${productId}`)
            .then(res => {
              // alert(res.data);
              this.getProducts();
            })
            .catch(function (error) {
              if (error.response) {
                alert('qandaydir xatolik!')
              }
            })

        console.log(productId)
      }
    },
    getData(number) {
      this.getProducts(number)
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
      this.getProducts()
    },
    nextPage() {
      if (this.currentPage * this.itemsPerPage < this.total) {
        this.currentPage++;
      }
      this.getProducts()
    },
  },
  computed: {
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return Array(Math.round(this.total / this.itemsPerPage) + 1).fill(1);
    },
  },
  beforeMount() {
    this.getTotal()
    console.log("Hello")
  },
}
</script>