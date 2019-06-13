<template>
    <div>
        <form v-if="isLogged" @submit.prevent="validateForm('form-feedback')" data-vv-scope="form-feedback" ref="form-feedback">
            <input type="hidden" name="IBLOCK_ID" value="1"/>
            <input type="hidden" name="SITE_ID" value="s1"/>
            <input type="hidden" name="post" value="Y"/>
            <input type="hidden" name="ELEMENT_ID" :value="element_id"/>
            <input type="hidden" name="act" value="add"/>
            <input type="hidden" name="sessid" :value="sessid"/>
            <label class="textfield half">
                <input name="user_name" type="text" :value="user" placeholder="Ваше имя">
            </label>
            <label class="textfield half">
                <input v-validate="'required|email'" :value="email" name="user_email" type="text" data-vv-as="Электронная почта" placeholder="Эл.почта">
                <span v-show="errors.has('form-feedback.user_email')" class="error">{{ errors.first('form-feedback.user_email') }}</span>
            </label>
            <label class="textfield">
                <textarea name="comment" cols="30" rows="10" placeholder="Текст комментария" required></textarea>
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
                    this.$refs[scope].submit()
                }
            });
        },
        loadComments() {
            
        }
    },
    data() {
        return {
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
        this.$axios.post(`/api/v1/comments/?IBLOCK_ID=${this.iblock_id}&ELEMENT_ID=${this.element_id}&SITE_ID=s1`, qs.stringify({'sessid':this.sessid}))
        .then((response) => {
            this.comments = response.data.comments;

            if (response.data.page == 0) 
                this.page = 0;

            this.pageCount = response.data.page;
        })
    }
}
</script>

