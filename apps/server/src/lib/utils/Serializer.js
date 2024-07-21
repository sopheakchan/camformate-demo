const JSONAPISerializer = require('jsonapi-serializer').Serializer

class Serializer {
  user(users, links) {
    return new JSONAPISerializer('users', {
      id: '_id',
      attributes: [
        'uid',
        'username',
        'email',
        'image',
        'representation',
        'account_type',
        'contacts',
        'favorites',
        'cv_url',
      ],
      keyForAttribute: 'underscore_case',
      topLevelLinks: {
        self: links?.self || '',
        previous: links?.previous || '',
        next: links?.next || '',
        last: links?.last || '',
      },
      typeForAttribute: () => {
        return 'Contact'
      },
      contacts: {
        ref: 'id',
        included: true,
        attributes: ['phone_number'],
      },
    }).serialize(users)
  }

  scholarship(scholarships, links) {
    return new JSONAPISerializer('scholarships', {
      id: '_id',
      attributes: [
        'scholarship_name',
        'description',
        'location',
        'majors',
        'school_name',
        'colleges',
        'price',
        'image_url',
        'upload_date',
        'deadline',
        'requirements',
        'benefits',
        'user_id',
        'phone_number',
        'email',
        'web',
        'slot',
        'user_profile',
      ],
      keyForAttribute: 'underscore_case',
      topLevelLinks: {
        self: links?.self || '',
        previous: links?.previous || '',
        next: links?.next || '',
        last: links?.last || '',
      },
      typeForAttribute: () => {
        return 'Scholarship'
      },
      requirements: {
        ref: 'id',
        included: true,
        attributes: ['requirement'],
      },
      benefits: {
        ref: 'id',
        included: true,
        attributes: ['benefit'],
      },
    }).serialize(scholarships)
  }

  //   job(jobs, links) {
  //     return new JSONAPISerializer('jobs', {
  //       id: '_id',
  //       attributes: [
  //         'scholarship_name',
  //         'start_date',
  //         'end_date',
  //         'description',
  //         'requirements',
  //         'benefits',
  //         'user_id',
  //       ],
  //       keyForAttribute: 'underscore_case',
  //       topLevelLinks: {
  //         self: links?.self || '',
  //         previous: links?.previous || '',
  //         next: links?.next || '',
  //         last: links?.last || '',
  //       },
  //       typeForAttribute: () => {
  //         return 'Scholarship'
  //       },
  //       requirements: {
  //         ref: 'id',
  //         included: true,
  //         attributes: ['requirement'],
  //       },
  //       benefits: {
  //         ref: 'id',
  //         included: true,
  //         attributes: ['benefit'],
  //       },
  //     }).serialize(jobs)
  //   }
}

module.exports = new Serializer()
