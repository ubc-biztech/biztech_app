/*
 Copyright 2019 Square Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
import ChargeError from '../ChargeError';

export default async function chargeCardNonce(nonce) {
  const response = await fetch("https://biztechapp.herokuapp.com", {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nonce,
    }),
  });

  try {
    const responseJson = await response.json();
    if (responseJson.errorMessage != null) {
      throw new ChargeError(responseJson.errorMessage);
    }
  } catch (error) {
    throw new ChargeError(error.message);
  }
}
