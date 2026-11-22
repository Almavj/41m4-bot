/**
 * copylink.js — Fetch and copy the current group's invite link.
 *
 * Fixed: removed 'grouplink' alias that conflicted with grouplink.js.
 */
export default {
  name: 'copylink',
  aliases: ['gcl'],
  category: 'group',
  description: 'Group invite links are disabled.',
  cooldown: 5000,
  permissions: { admin: true },
  execute: async ({ m }) => {
    return await m.reply.error('Group invite links are disabled.');
  }
};
