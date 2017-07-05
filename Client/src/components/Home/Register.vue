<template>
  <section class="register">
    <p>
      <span class="theme">Username</span>
      <el-input> </el-input>
    </p>
    <p>
      <span class="theme">password</span>
      <el-input> </el-input>
    </p>
    <p>
      <span class="theme">Name</span>
      <el-input> </el-input>
    </p>
  
    <p>
      <span class="theme">gender</span>
      <br>
      <el-radio class="radio" v-model="radio" label="1">male</el-radio>
      <el-radio class="radio" v-model="radio" label="2">female</el-radio>
    </p>
      <div class="block">
        <span class="theme">Birthdate</span>
        <br>
        <el-date-picker v-model="value1" type="date" class="date-picker" placeholder="Pick a day">
        </el-date-picker>
      </div>
      <p>  
      <span class="theme">Description:</span>
    <el-input
  type="textarea"
  :autosize="{ minRows: 2, maxRows: 4}"
  placeholder="Please input"
  v-model="desc">
</el-input>
  <p><span class="theme">Interests</span>  <el-input> </el-input></p>
    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture">
      <el-button size="small" type="primary">Click to upload</el-button>
      <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
    </el-upload>
    <div class="block">
       <span class="theme">matching age:</span>
      <el-slider v-model="value9" class="ages" range show-stops :min="18" :max="120">
      </el-slider>
    </div>
  
    <p>
      <span class="theme">matching gender:</span>
      <br>
      <el-radio class="radio" v-model="radio1" label="1">male</el-radio>
      <el-radio class="radio" v-model="radio1" label="2">female</el-radio>
      <el-radio class="radio" v-model="radio1" label="3">both</el-radio>
    </p>
  
  </section>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      value1: '',
      value2: '',
      radio: '1',
      radio1: '1',
      fileList2: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      value9: [20, 50],
      desc:null
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  display: inline;
  width: 100%;
}
.block{
   width: 95%;
}

.ages , .date-picker{
  width: 100%;
}

.register {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: space-around;
}
</style>
