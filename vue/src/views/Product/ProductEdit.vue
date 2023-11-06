<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Mahsulotni tahrirlash</h4>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label for="">Name uz</label>
          <input type="text" required v-model="model.product.name_uz" class="form-control">
        </div>
        <div class="mb-3">
          <label for="">Cost</label>
          <input type="text" required v-model="model.product.cost" class="form-control">
        </div>
        <div class="mb-3">
          <label for="">Address</label>
          <input type="text" required v-model="model.product.address" class="form-control">
        </div>
        <div class="mb-3">
          <label for="">Product Type id</label>
          <input type="text" required v-model="model.product.product_type_id" class="form-control">
        </div>
        <div class="mb-3">
          <label for="">created_date</label>
          <input type="text" required v-model="model.product.created_date" class="form-control">
        </div>
        <div class="mb-3" style="display: flex; justify-content: space-between">
          <button type="button" @click="saveStudent" class="btn btn-primary">Saqlash</button>
          <button type="button" @click="back" class="btn btn-danger">Bekor qilish</button>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "StudentEdit",
  data() {
    return {
      productId: '',
      model: {
        product: {
          name_uz: '',
          cost: '',
          address: '',
          product_type_id: '',
          created_date: '',
        }
      }
    }
  },
  mounted() {
    this.productId = this.$route.params.id;
    this.getStudentData(this.productId);
  },
  methods: {
    getStudentData(itemId) {
      axios.get(`http://94.158.54.194:9092/api/product`).then(res => {
        const products = res.data
        const found = products.find(product => product.id == this.productId)
        this.model.product = found
      }).catch(function (error) {
        console.log(error);
      })
    },
    saveStudent() {
      const myThis = this;
      axios.put('http://94.158.54.194:9092/api/product', this.model.product).then(res => {
        // alert(res.data)
        router.push({path: '/products'})

      }).catch(function (error) {
        if (error.response) {
          if (error.response.status == 422) {
            myThis.errorList = error.response.data.errors;
          }
        }
      })
    },
    back() {
      router.push({path: '/products'})
    }

  }
}

</script>

