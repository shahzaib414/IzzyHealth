const cloudinary = require('cloudinary');
const Validator = require('../../../common/validator');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');
const getPatient = require('./getPatient');

const updateProfilePhoto = async ({ profilePhoto, id, email }) => {
  const rules = {
    profilePhoto: 'required',
    id: 'required',
    email: 'required',
  };
  const fieldsValidated = await Validator.validateAsync({ profilePhoto, id, email }, { rules });

  if (fieldsValidated !== true) {
    throw new IzzyFieldErrors(IzzyFieldErrors.ERROR_MESSAGES.MISSING_FIELD, fieldsValidated);
  }
  const data = { profilePhoto, id, email };
  const user = await getPatient(data);
  if (user.personalUserInfo && user.personalUserInfo.profileImage) {
    await cloudinary.v2.api.delete_resources_by_tag(`photo-${user.id}`);
  }
  const cloudinaryResponse = await cloudinary.v2.uploader.upload(data.file.path, {
    resource_type: 'image',
    public_id: `photo-${user.id}`,
  });
  user.personalUserInfo = {
    profileImage: cloudinaryResponse.secure_url,
  };
  user.save();
  return user;
};
module.exports = updateProfilePhoto;
