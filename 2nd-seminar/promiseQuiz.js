const members = require('./members');

const getOnline = members => new Promise((resolve, reject) => {
  setTimeout(() => {
    const data = members.filter(member => member.location === 'online');
    resolve(data);
  }, 500);
});

const getOffline = members => new Promise((resolve, reject) => {
  setTimeout(() => {
    const data = members.filter(member => member.location === 'offline');
    resolve(data);
  }, 500);
});

const getYB = members => new Promise((resolve, reject) => {
  setTimeout(() => {
    const data = members.filter(member => member.group === 'YB');
    resolve(data);
  }, 500);
});

const getOB = members => new Promise((resolve, reject) => {
  setTimeout(() => {
    const data = members.filter(member => member.group === 'OB');
    resolve(data);
  }, 500);
});

// promise ver.
getOnline(members).then(getOB).then(console.log);
getOffline(members).then(getYB).then(console.log);

// async & await ver.
const asyncFunc = async members => {
  const onlineMembers = await getOnline(members);
  const onlineObMembers = await getOB(onlineMembers);
  console.log(onlineObMembers);
}

asyncFunc(members);