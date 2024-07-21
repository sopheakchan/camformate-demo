const { BadRequestError } = require('../helper/ErrorMessages')
const ApplicationModel = require('../models/application.model')
const UserModel = require('../models/users.model')
const SendEmail = require('../helper/MailSender')

class ApplicationController {
  // apply action
  async apply(req, res) {
    const user_id = req.user
    const user = await UserModel.findOne({ uid: user_id })

    // if user doesn't have a cv then not allow to apply
    if (!user.cv_url) {
      throw new BadRequestError("You don't have a CV. Please create one.")
    }

    const isApplied = await ApplicationModel.findOne({
      user_id: user._id,
      'announcement.id': req.body.announcement?.id,
    })

    if (isApplied) {
      throw new BadRequestError('You have already applied.')
    }

    const data = {
      user_id: user._id,
      announcement: req.body.announcement,
    }

    const application = await (
      await ApplicationModel.create(data)
    ).populate({ path: 'announcement.id', model: data.announcement.type })

    const announcement = application.announcement.id

    // send email for job announcement
    if (data.announcement.type === 'jobs') {
      SendEmail(
        announcement.gmail !== ''
          ? announcement.gmail
          : 'yimsotharoth999@gmail.com',
        `Application for announcement: ${announcement._id}`,
        req.body.message
          ? req.body.message
          : `Greeting ${announcement.company}, I would like to apply for ${announcement.job_name} position. I expect to hear back your responses. Best regard.`,
        user.cv_url,
      )
      // send email for scholarship announcement
    } else {
      SendEmail(
        announcement.email !== ''
          ? announcement.email
          : 'yimsotharoth999@gmail.com',
        `Application for announcement: ${announcement.scholarship_name}`,
        req.body.message
          ? req.body.message
          : `Greeting ${announcement.school_name}, I would like to apply for ${announcement.scholarship_name} position. I expect to hear back your responses. Best regard.`,
        user.cv_url,
      )
    }

    res.status(201).json({
      status: 'Success',
      message: 'Applied Successfully',
      application: application,
    })
  }
}

module.exports = new ApplicationController()
