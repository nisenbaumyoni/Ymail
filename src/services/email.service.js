/* eslint-disable no-unused-vars */
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    createEmail,
    getDefaultFilter
}

const STORAGE_KEY = 'Ymail'

const loggedinUser = {
    email: 'yonin@gmail.com',
    fullname: 'Mahta appsus'
}

_createEmails()

//TODO
async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY)
    // console.log('emailService.query after queriying from storage',emails)
    if (filterBy) {
        var { from, to } = filterBy
        from = from || ''
        to = to || ''
        emails = emails.filter(email => email.from.toLowerCase().includes(from.toLowerCase()) && email.to.toLowerCase().includes(to.toLowerCase()))
            // && (email.batteryStatus < maxBatteryStatus)
            // && email.batteryStatus > minBatteryStatus)
    }
    return emails
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        emailToSave.isOn = false
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}

function createEmail(subject = '', body = '', isRead = false, isStarred = false, from= '', to = '') {

    const id = utilService.makeId()
    const sentAt = new Date()
    const removedAt = null

    return {
        id,
        subject,
        body,
        isRead,
        isStarred,
        sentAt,
        removedAt,
        from,
        to
    }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = [
            { _id: 'e101', subject: 'test1', body: 'bla', isRead: false, isStarred: false, sentAt: 1551153930594, removedAt: null, from: 'momo@momo.com', from_name: 'Momo Richards', to: 'user@appus.com', folder: 'inbox'},
            { _id: 'e102', subject: 'test2', body: 'berergergerg', isRead: false, isStarred: false, sentAt: 1554133340694, removedAt: null, from: 'momo@momo.com', from_name: 'Momo Richards', to: 'user@appus.com', folder: 'inbox'},
            { _id: 'e103', subject: 'test3', body: 'grrr', isRead: false, isStarred: false, sentAt: 1551133930094, removedAt: null, from: 'momo@momo.com', from_name: 'Momo Richards', to: 'user@appus.com', folder: 'inbox'},
            { _id: 'e104', subject: 'test4', body: 'bererewfwefrgerg', isRead: false, isStarred: false, sentAt: 1551133330590, removedAt: null, from: 'yoni@gmail.com', from_name: 'Yoni Nisenbaum', to: 'user@appus.com', folder: 'inbox'},
            { _id: 'e105', subject: 'Hello!', body: 'jeivdrergergerg', isRead: false, isStarred: false, sentAt: 1561133935490, removedAt: null, from: 'yoni@gmail.com', from_name: 'Yoni Nisenbaum', to: 'user@appus.com', folder: 'inbox'},
            { _id: 'e106', subject: 'WDYS?', body: 'jeivdrergergerg', isRead: false, isStarred: false, sentAt: 1551333935520, removedAt: null, from: 'yoni@gmail.com', from_name: 'Yoni Nisenbaum', to: 'user@appus.com', folder: 'inbox'},
            { _id: 'e107', subject: 'about your scholarship', body: 'jeivdrergergerg', isRead: false, isStarred: false, sentAt: 1551133945550, removedAt: null, from: 'george@gmail.com', from_name: 'George Stewart', to: 'user@appus.com', folder: 'inbox'}

        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}

//TODO
function getDefaultFilter() {
    return {
        from: '',
        to: ''
        // minBatteryStatus: 50,
        // maxBattery: '',
        // model: ''
    }
}


