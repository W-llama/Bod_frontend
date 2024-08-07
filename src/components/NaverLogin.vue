<template>
  <div id="naverIdLogin"></div>
</template>

<script>
export default {
  name: 'NaverLogin',
  props: {
    clientId: {
      type: String,
      required: true
    },
    callbackUrl: {
      type: String,
      required: true
    },
    callbackFunction: {
      type: Function,
      required: true
    },
    isPopup: {
      type: Boolean,
      default: false
    },
    buttonColor: {
      type: String,
      default: 'green'
    },
    buttonType: {
      type: Number,
      default: 3
    },
    buttonHeight: {
      type: Number,
      default: 60
    },
    scriptUrl: {
      type: String,

    },
    errorMessage: {
      type: String,
      default: '현재 네이버 로그인 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해주세요.'
    },
  },
  mounted() {
    this.initializeNaverLogin();
  },
  methods: {
    initializeNaverLogin() {
      console.log('Initializing Naver Login');
      const naverLogin = new naver.LoginWithNaverId({
        clientId: this.clientId,
        callbackUrl: this.callbackUrl,
        isPopup: this.isPopup,
        loginButton: {
          color: this.buttonColor,
          type: this.buttonType,
          height: this.buttonHeight
        }
      });

      naverLogin.init();
      window.addEventListener('load', () => {
        naverLogin.getLoginStatus((status) => {
          console.log('Naver login status:', status);
        });
      });
    },
    handleError(err) {
      console.warn(`This component threw an error (in '${err.target.outerHTML}'):`, this);
    }
  }
};
</script>
