<template>
    <div class="comments">
        <div v-if="error" class="alert alert-danger" role="alert" v-html="error"></div>
        <form v-if="isLogged" @submit.prevent="validateForm('form-feedback')" data-vv-scope="form-feedback" ref="form-feedback">
            <div class="comments__rating" v-if="rating_show">
                <span class="comments__rate-item">Оцените товар:</span>
                <star
                    class="rating"
                    @rating-selected="setReting"
                    inactive-color="#e6e6e6"
                    active-color="#999999"
                    :show-rating="false"
                    :round-start-rating="false"
                    :star-points="[13.998,4.965, 9.306,4.085, 6.999,0.000, 4.692,4.085, 0.000,4.965, 3.266,8.370, 2.673,12.999, 6.999,11.018, 11.325,12.999, 10.732,8.370]"
                />
            </div>
            <label class="textfield half">
                <input name="user_name" type="text" :value="user" placeholder="Ваше имя">
            </label>
            <label class="textfield half">
                <input v-validate="'required|email'" :value="email" name="user_email" type="text" data-vv-as="Электронная почта" placeholder="Эл.почта">
                <span v-show="errors.has('form-feedback.user_email')" class="error">{{ errors.first('form-feedback.user_email') }}</span>
            </label>
            <label class="textfield">
                <textarea name="comment" v-model="comment" cols="30" rows="10" placeholder="Текст комментария" required></textarea>
            </label>
            <button class="button black submit" type="submit">Отправить</button>
        </form>
<!--        <div class="comments__container">-->
<!--            <div class="comments__comment" v-for="(comment, index) in newComment" :key="index">-->
<!--                <p class="comments__date">{{comment.DateFormated}}</p>-->
<!--                <p class="comments__name">{{comment.AuthorName}}</p>-->
<!--                <p class="comments__text" v-html="comment.TextFormated"></p>-->
<!--            </div> -->
<!--            <div class="comments__comment" v-for="(comment, index) in commentsPage" :key="index">-->
<!--                <p class="comments__date">{{comment.DateFormated}}</p>-->
<!--                <p class="comments__name">{{comment.AuthorName}}</p>-->
<!--                <p class="comments__text" v-html="comment.TextFormated"></p>-->
<!--            </div>            -->
<!--            <pagination-->
<!--                v-model="pagen"-->
<!--                :page-count="pageCount"-->
<!--                :classes="paginationClasses"-->
<!--                :labels="customLabels"-->
<!--            />-->
<!--        </div>-->
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import qs from 'qs'
import Star from '~/components/catalog/star/star.vue'
import Pagination from '~/components/Pagination.vue'

export default {
    components: {
        Pagination,
        Star,
    },
    props: ['iblock_id', 'element_id', 'rating_show'],
    methods: {
        setReting(value) {
            this.rating = value - 1;
        },
        validateForm(scope) {
            this.$validator.validateAll(scope).then((result) => {
                if (result) {
                    this.addComment();
                }
            });
        },
        addComment() {
            var params = {
                'act':'add',
                'post':'Y',
                'SITE_ID':'s1',
                'AJAX_POST':'Y',
                'sessid':this.sessid,
                'ELEMENT_ID':this.element_id,
                'IBLOCK_ID':this.iblock_id,
                'comment':this.comment,
                'vote_id':this.element_id,
                'vote':'Y',
                'rating':this.rating,
                'AJAX_CALL':'Y',
                'PAGE_PARAMS[ELEMENT_ID]':this.element_id,
                'SESSION_PARAMS':this.sessionParams
            }
            this.$axios.post(`/api/v1/comments/`, qs.stringify(params)).then((response) => {

                if (response.data.error)
                    this.error = response.data.error;

                if (response.data.comments)
                    this.newComment.push(response.data.comments[0][0]);

            })
            
        },
        loadComments() {
            this.$axios.post(`/api/v1/comments/?IBLOCK_ID=${this.iblock_id}&ELEMENT_ID=${this.element_id}&SITE_ID=s1`, qs.stringify({'sessid':this.sessid}))
            .then((response) => {
                this.comments = response.data.comments;

                if (response.data.session_params)
                    this.sessionParams = response.data.session_params;

                if (response.data.page == 0 || response.data.page == 1) 
                    this.pagen = 0;

                if (response.data.page)
                    this.pageCount = response.data.page;
            })
        }
    },
    data() {
        return {
            rating: 0,
            sessionParams: '',
            error:false,
            newComment: [],
            comment: '',
            comments:false,
            pagen: 1,
            pageCount: 1,
            paginationClasses: {
                ul: 'pagination',
                li: 'pagination__li',
                liActive: 'active',
                liDisable: 'disabled',
                button: 'pagination__btn'
            },
            customLabels: {
                first: 'First',
                prev: 'Previous',
                next: 'Next',
                last: 'Last'
            },
        }
    },
    computed: {
        commentsPage() {
            if (!this.comments)
                return false;

            return this.comments[this.pagen];
        },
        ...mapGetters({
            sessid: 'user/getSessid',
            user: 'user/getName',
            email: 'user/getEmail',
            isLogged: 'user/isLogged',
        })
    },
    mounted() {
        this.loadComments();
    }
}
</script>

<style lang="scss">
.comments {
    &__rating {
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 10px;
        .rating {
            transform: scale(1.2);
        }
    }
    &__rate-item {
        margin-right: 20px;
    }
    &__container {
        margin-top: 40px;
    }
    &__comment {
        padding: 19px;
        margin-bottom: 20px;
        background-color: #f5f5f5;
        border: 1px solid #e3e3e3;
        border-radius: 4px;
        box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
        p {
            word-wrap: break-word;
        }
    }
    &__name{
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: bold;
    }
    &__date {
        float: right;
        margin-bottom: 10px;
    }
    &__text {
        margin-bottom: 0;
    }
    &::after {
        content: "";
        display: table;
        clear: both;
    }
}
</style>

