import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

class Contact {
    constructor(id = null, image = null, name, role, phone) {
		this.id = id,
		this.image = image,
		this.name = name,
		this.role = role,
		this.phone = phone;
    }
}

export default new Vuex.Store({
    state: {
		contacts: [
			{
				id: 1,
				image: null,
				name: 'Мама',
				role: 'Семья',
				phone: '+380677767960',
			},
			{
				id: 2,
				image: null,
				name: 'Начальник',
				role: 'Работа',
				phone: '+380676654620',
			}
		]
	},
    mutations: {
		createContact (state, payload) {
            state.contacts.push(payload)
		},
		removeContact (state, payload) {
			state.contacts.splice(state.contacts.indexOf(payload), 1)
		}
	},
    actions: {
		createContact ({commit}, payload) {
			const newContact =  new Contact (
				payload.id,
				payload.image,
				payload.name,
				payload.role,
				payload.phone
			)
			commit('createContact', {...newContact})
		},
		removeContact ({commit}, payload) {
			commit('removeContact', payload)
		}
	},
	getters: {
		contacts (state) {
            return state.contacts
		},
		contactById (state) {
            return contactId => {
                return state.contacts.find(contact => contact.id == contactId)
            }
        }
	},
    modules: {},
});
