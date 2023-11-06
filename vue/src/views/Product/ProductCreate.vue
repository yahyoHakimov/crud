<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Add Product</h4>
      </div>
      <div class="card-body">

        <div class="mb-3">
          <label for="">Name uz</label>
          <input type="text" required v-model="model.products.name_uz" class="form-control">
        </div>
        <div class="mb-3">
          <label for="">Cost</label>
          <input type="text" required v-model="model.products.cost" class="form-control">
        </div>
        <div class="mb-3">
          <label for="">Address</label>
          <input type="text" required v-model="model.products.address" class="form-control">
        </div>
        <div class="mb-3">
          <label for="">Product Type id</label>
          <input type="text" required v-model="model.products.product_type_id" class="form-control">
        </div>
        <div class="mb-3">
          <label for="">created_date</label>
          <input type="text" required v-model="model.products.created_date" class="form-control">
        </div>
        <div class="mb-3">
          <button type="button" @click="saveProduct" class="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import router from "@/router";
export default {
  name: "ProductCreate",
  data() {
    return {
      errorList: '',
      model: {
        products: {
          name_uz: '',
          cost: '',
          address: '',
          product_type_id: '',
          created_date: '',
        }
      }
    }
  },
  methods: {
    saveProduct() {
      const myThis = this;
      axios.post('http://94.158.54.194:9092/api/product', this.model.products)
          .then(res => {
            alert("Malumot qo'shildi")
            router.push({path: '/products'})
            this.model.products = {
              name_uz: '',
              cost: '',
              address: '',
              product_type_id: '',
              created_date: '',
            }
          })
          .catch(function (error) {
            if (error.response) {
              if (error.response.status === 422) {
                myThis.errorList = error.response.data.errors;
              }
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
          })
    }
  }
}

</script>

<style scoped>

</style>