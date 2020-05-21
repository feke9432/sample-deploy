/*
 * @Author: Feke_Hunter
 * @Date: 2020-05-21 09:44:52
 * @LastEditTime: 2020-05-21 10:02:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sample-deploy\src\compressed\compressedTypeMap.js
 */ 
const CompressedTypeMap = {
  'zip': {
    type: 'zip',
    unZipScript: 'unzip',
  },
  'tar': {
    type: 'tar',
    unZipScript: 'tar -xf'
  }
}
module.exports = CompressedTypeMap