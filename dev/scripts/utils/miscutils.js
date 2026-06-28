/**
 * @param {number} [duration] 
 */
export async function wait(duration = 1) {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
  return;
};