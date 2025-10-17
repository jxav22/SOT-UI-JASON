// should export an array of registered email strings, with all of the emails in lowercase

const raw_data = ["test@gmail.com"]

export default raw_data.map(email => email.toLowerCase());