<template>
  <section class="register">
    <h1>
      <span class="theme"> user details </span>
    </h1>
    <el-input class="input-model" placeholder="Username" type="text" v-model="userName"> </el-input>
    <el-input class="input-model" placeholder="Password" type="password"> </el-input>
    <el-input class="input-model" placeholder="Repeat password" type="password"> </el-input>
    <h1>
      <span class="theme"> profile </span>
    </h1>
    <div>
      <el-input class="input-model nameInput" placeholder="First name" type="text" v-model="Pname"> </el-input>
      <el-input class="input-model nameInput" placeholder="Last name" type="text" v-model="lName"> </el-input>
    </div>
    <el-date-picker v-model="birth" type="date" class="date-picker input-model" placeholder="Birthday">
    </el-date-picker>
    <el-input class="input-model" placeholder="Interests"> </el-input>
  
    <el-input class="input-model" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Description" v-model="desc">
    </el-input>
    <br>
    <div>
      <span class="theme">gender</span>
      <el-radio class="radio" v-model="gender" label="1">male</el-radio>
      <el-radio class="radio" v-model="gender" label="2">female</el-radio>
    </div>
    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture">
      <el-button size="small" type="primary">Click to upload</el-button>
      <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
    </el-upload>
  
    <h1 span class="theme">match preferance</span>
    </h1>
  
    <div class="block">
      <span class="theme">matching age:</span>
      <el-slider v-model="value9" class="ages" range show-stops :min="18" :max="120">
      </el-slider>
    </div>
  
    <div>
      <span class="theme">matching gender:</span>
      <el-radio class="radio" v-model="genferPref" label="1">male</el-radio>
      <el-radio class="radio" v-model="genferPref" label="2">female</el-radio>
      <el-radio class="radio" v-model="genferPref" label="3">both</el-radio>
    </div>
  
  </section>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      Pname:'',
      lname: '',
      userName: '',
      gender: null,
      genferPref: null,
      birth: null,
      value2: '',
      fileList2: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      value9: [20, 50],
      desc: null
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

.block {
  width: 95%;
}

.ages,
.date-picker {
  width: 100%;
}

.radio {
  margin-left: 1em;
}

.register {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: space-around;
}

.nameInput{
  width: 49%;
}

.input-model {
  margin-top: 1em;
  height: 40px;
}
</style>
