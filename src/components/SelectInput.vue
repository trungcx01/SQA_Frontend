<template>
  <div
    class="select-input-wrapper"
    @click="() => (isShowDropdown = !isShowDropdown)"
    v-click-outside="handleClickOutside"
  >
    <div class="title-input-wrapper">
      <input
        v-model="inputValue[keyName]"
        :placeholder="placeholder"
        class="input-style"
        readonly
      />
    </div>
    <unicon name="angle-down" fill="#231321" width="24px" height="24px" />
    <div class="input-dropdown" v-if="isShowDropdown">
      <div
        class="dropdown-item"
        v-for="item in options"
        :key="item[keyId]"
        @click="onChooseItem(item[keyId])"
      >
        {{ item[keyName] }}
      </div>
    </div>
  </div>
</template>
<script>
import vClickOutside from 'click-outside-vue3'
export default {
  name: 'SelectInput',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true
    },
    keyName: {
      type: String,
      default: 'name'
    },
    keyId: {
      type: String,
      default: 'id'
    },
    value: {
      type: Object,
      required: true
    }
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  data() {
    return {
      inputValue: {},
      isShowDropdown: false
    }
  },
  methods: {
    handleClickOutside() {
      this.isShowDropdown = false
    },
    onChooseItem(id) {
      this.$emit('onChooseItem', id)
    }
  },
  watch: {
    value: {
      handler(val) {
        this.inputValue = val
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.select-input-wrapper {
  width: 300px;
  height: 40px;
  border: 1px solid #232321;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  position: relative;
  cursor: pointer;

  .title-input-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;

    .title {
      font-size: 12px;
    }
  }

  .input-style {
    width: 100%;
    cursor: pointer;
    outline: none;
    line-height: 20px;
    background: transparent;
    color: #231321;
    border: none;
  }
  .input-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 2;
    width: inherit;
    border-radius: 8px;
    background: #fff;
    border: 1px solid #231321;

    .dropdown-item {
      min-height: 40px;
      display: flex;
      align-items: center;
      padding-left: 10px;
      padding-right: 10px;

      &:hover {
        background: #231321;
        color: #fff;
      }

      &:first-child {
        border-radius: 8px 8px 0 0;
      }

      &:last-child {
        border-radius: 0 0 8px 8px;
      }
    }
  }
}
</style>
