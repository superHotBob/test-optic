<template>
  <div class="main-container">
    <div class="page-error">
        <div class="text-error">
            <p class="title">Ой!</p>
            <p class="description">
                А такой странички у нас нет.
                <span>Или мы ее еще не создали :)</span>
            </p>
            <div class="button-error">
                <p>Но вы можете</p>
                <nuxt-link class="btn btn-link" to="/opravy">Перейти в Оправы</nuxt-link>
                <nuxt-link class="btn btn-link" to="/linzy-dlya-ochkov">Перейти в Линзы</nuxt-link>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  head() {
      return {
          title:this.error.statusCode
      }
  }
}
</script>

<style lang="scss">
    .page-error {
        min-height: 560px;
        padding: 1rem;
        color: #000;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-family: sans-serif;
        font-weight: 100 !important;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        position: relative;
        background-image: url('~assets/images/404/logo.png'), url('~assets/images/404/404.png');
        background-size: 37%, 50%;
        background-position: center left, 100% 20%;
        background-repeat: no-repeat;
        .text-error {
            max-width: 530px;
            position: absolute;
            right: 0;
            bottom: 15px;
            .title {
                font-size: 67px;
                font-weight: 700;
                text-transform: uppercase;
            }
            .description {
                font-size: 31px;
                font-weight: 700;
                line-height: 31px;
                span {
                    color: #9a9a9a;
                    font-size: 26px;
                    font-weight: 400;
                    line-height: 26px;
                    display: block;
                    margin-top: 15px;
                }
            }
            .button-error {
                margin-top: 70px;
                color: #e74c3c;
                font-size: 20px;
                font-weight: 400;
                line-height: 20px;
                .btn-link {
                    background-color: #e74c3c;
                    color: #fff;
                    font-size: 13px;
                    font-weight: 700;
                    text-transform: uppercase;
                    text-decoration: none;
                    line-height: 26px;
                    border-radius: 0;
                }
            }
        }
    }
    @media (max-width: 650px) {
        .page-error {
            background-position: 0 20%, 100% 20%;
            .text-error {
                bottom: auto;
                .title {
                    font-size: 18px;
                }
                .description {
                    font-size: 18px;
                    span {
                        color: #9a9a9a;
                        font-size: 13px;
                        margin-top: 10px;
                    }
                }
            }
            
        }
        
    }
    @media (max-width: 440px) {
        .page-error {
            .text-error {
                text-align: right;
                position: relative;
                .button-error {
                    text-align: center;
                }
            }
            
        }
        
    }
    @media (max-width: 370px) {
        .page-error {
            background-position: 0 5%, 100% 20%;
            .text-error {
                .button-error {
                    a {
                        display: block;
                        width: 100%;
                        &:nth-of-type(2) {
                            margin-top: 10px;
                        }
                    }
                }
            }
            
        }
    }
</style>
