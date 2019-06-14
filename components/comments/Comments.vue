<template>
    <div>
        <form v-if="isLogged" @submit.prevent="validateForm('form-feedback')" data-vv-scope="form-feedback" ref="form-feedback">
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
        <div>
            <div v-for="(comment, index) in commentsPage" :key="index">
                <div>{{comment.AuthorName}}</div>
                <div>{{comment.DateFormated}}</div>
                <div v-html="comment.TextFormated"></div>
            </div>
            <pagination
                v-model="pagen"
                :page-count="pageCount"
                :classes="paginationClasses"
                :labels="customLabels"
            />
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import qs from 'qs'
import Pagination from '~/components/Pagination.vue'

export default {
    components: {
        Pagination
    },
    props: ['iblock_id', 'element_id'],
    methods: {
        validateForm(scope) {
            this.$validator.validateAll(scope).then((result) => {
                if (result) {
                    // this.$refs[scope].submit()
                    this.addComment();
                }
            });
        },
        addComment() {
            var params = {
                'act':'add',
                'post':'Y',
                'SITE_ID':'Y',
                'AJAX_POST':'Y',
                'sessid':this.sessid,
                'ELEMENT_ID':this.element_id,
                'IBLOCK_ID':this.iblock_id,
                'comment':this.comment
            }
            this.$axios.post(`/api/v1/comments/`, qs.stringify(params)).then((response) => {
                console.log(response);

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

                if (response.data.page == 0) 
                    this.page = 0;
                if (response.data.page)
                    this.pageCount = response.data.page;
            })
        }
    },
    data() {
        return {
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

