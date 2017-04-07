<template>
    <div class="row">
        <div class="col-md-3">
            <button type="button" class="btn btn-default btn-sm" @click="showNewNote()">Add New Note</button>
            <hr />
            <ul class="nav nav-pills nav-stacked">
                <li type="presentation" v-if="newNote">
                    <div class="form-group">
                        <input type="text" class="form-control" ref="noteinput"
                               @keyup.enter="createNewNote()" @keyup.esc="cancelNewNote()"
                               v-model="newTitle">
                        <p class="help-block">Press ENTER to create and ESC to cancel.</p>
                    </div>
                </li>
                <li role="presentation" v-for="note in notes"
                    :class="{ 'active': selected ? note.id === selected.id : false }">
                    <a href="#" @click.prevent="setSelected(note)">{{ note.title }}</a>
                </li>
            </ul>
        </div>
        <div class="col-md-9" v-if="selected">
            <div class="row">
                <div class="col-md-12">
                    <button type="button" class="btn btn-default btn-sm pull-right" @click.prevent="updateNote(selected)">Save</button>
                </div>
                <div class="col-md-12">
                    <hr />
                    <textarea class="form-control" style="resize: none; height: 500px;"
                              :value="selected.body" v-model="selected.body"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        data () {
            return {
                newTitle: '',
                newBody: '',
                newNote: false
            }
        },
        methods: {
            ...mapActions({
                getNotes: 'notes/getNotes',
                createNote: 'notes/createNote',
                setSelected: 'notes/setSelected',
                updateNote: 'notes/updateNote'
            }),
            showNewNote () {
                this.newNote = true
                setTimeout(() => {
                    this.$refs.noteinput.focus()
                }, 1)
            },
            createNewNote () {
                this.createNote(this.newTitle).then(() => {
                    this.newTitle = ''
                    this.newNote = false
                })
            },
            cancelNewNote () {
                this.newTitle = ''
                this.newNote = false
            }
        },
        computed: {
            ...mapGetters({
                notes: 'notes/getNotes',
                selected: 'notes/getSelectedNote'
            })
        },
        mounted () {
            this.getNotes()
        }
    }
</script>