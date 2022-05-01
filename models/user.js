const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const { randomUUID } = require('crypto')
const { Role } = require('../libs/constants')

const userSchema = new Schema(
	{
		password: {
			type: String,
			required: [true, 'Password is required']
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: true
		},
		subscription: {
			type: String,
			enum: { values: Object.values(Role) },
			default: Role.STARTER
		},
		avatarUrl: {
			type: String,
			default: function () {
				return gravatar.url(this.email, { s: '250' }, true)
			}
		},

		token: {
			type: String,
			default: null
		},
		isVerify: {
			type: Boolean,
			default: false
		},
		verifyKey: {
			type: String,
			default: randomUUID(),
			required: [true, 'Verify key is required']
		}
	},
	{
		versionKey: false,
		timestamps: true
	}
)

userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		const salt = await bcrypt.genSalt(6)
		this.password = await bcrypt.hash(this.password, salt)
	}
	next()
})

userSchema.methods.isValidPassword = async function (password) {
	return await bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

module.exports = User
