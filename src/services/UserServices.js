/* eslint-disable no-useless-catch */
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import database from '../database/models';
import getConfirmationEmail from '../utils/ConfirmationEmail';

dotenv.config();

/**
 * @class UserService
 * @description user service methods
 */
class UserService {
  /**
   *
   * @param {Object} newUser
   * @returns {Object} newUser
   */
  static async addUser(newUser) {
    const addedUser = await database.User.create(newUser);
    return addedUser;
  }

  /**
   *
   * @param {Object} userEmail
   * @returns {Object} user
   */
  static async findUserByEmail(userEmail) {
    const user = await database.User.findOne({ where: { email: userEmail } });
    if (!user) return null;
    return user.dataValues;
  }

  /**
 *
 * @param {object} userInfo
 *  * @param {object} tokenOwner
 * @returns {*} userInfo
 */
  static async storeToken(userInfo) {
    try {
      const searchToken = await database.PasswordResets.findOne({
        where: { user_id: userInfo.user_id }
      });
      if (searchToken) {
        await database.PasswordResets.update(userInfo, { where: { user_id: userInfo.user_id } });
        return userInfo;
      }
      const newToken = await database.PasswordResets.create(userInfo);
      return newToken;
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param {Object} token
   * @returns {Object} response
   */
  static async storedToken(token) {
    const storedToken = await database.PasswordResets.findOne({ where: { token } });
    if (!storedToken) return null;
    return storedToken.dataValues;
  }

  /**
   * @param {object} id
 * @returns {object} response
 */
  static async findTokenByUserID(id) {
    const storedToken = await database.PasswordResets.findOne({ where: { id } });
    if (!storedToken) return null;
    return storedToken.dataValues;
  }

  /**
 *
 * @param {object} token
 * @returns {object} destroy token
 */
  static async destroyToken(token) {
    try {
      const searchToken = await database.PasswordResets.findOne({
        where: { token }
      });
      if (searchToken) {
        const destroy = {
          valid: false,
        };
        await database.PasswordResets.update(destroy, { where: { token } });
        return destroy;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  /**
 *
 * @param {object} userEmail
 * @param {object} password
 * @returns {object} user
 */
  static async updateCredentials(userEmail, password) {
    try {
      const userToUpdate = await database.User.findOne({
        where: { email: userEmail }
      });
      if (userToUpdate) {
        const newUser = {
          password,
        };
        await database.User.update(newUser, { where: { email: userEmail } });
        return newUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param  {String} token
   * @param  {String} email
   * @returns {Object} result;
   */
  static async sendConfirmationEmail(token, email) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    let message = {
      to: email,
      from: process.env.EMAIL_MESSAGE_FROM,
      subject: 'Confirmation email',
      html: getConfirmationEmail(token),
    };

    if (process.env.NODE_ENV === 'test') {
      message = { ...message, mail_settings: { sandbox_mode: { enable: true } } };
    }

    return sgMail.send(message);
  }
}

export default UserService;