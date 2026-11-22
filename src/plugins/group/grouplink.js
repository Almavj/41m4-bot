export default {
  name: 'grouplink',
  aliases: ['invitelink', 'invite'],
  category: 'group',
  description: 'Group invite links are disabled.',
  permissions: { groupOnly: true, admin: true, botAdmin: true },
  cooldown: 5000,
  execute: async ({ m }) => {
    return await m.reply.error('Group invite links are disabled.');
  }
};
