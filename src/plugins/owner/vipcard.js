/**
 * vipcard.js — owner-only showcase of the r18 VIP unified-response envelope.
 *
 * Wires the orphaned vipRichKit builders (sendUnifiedRich, productItemCard,
 * markdownText, extWidget, followUpPills) into a real command — the
 * .testrich "vipcard" pattern as a brandable flex card:
 *
 *   product card + markdown + 3PExt widget CTAs + follow-up pills
 *   + hScroll gallery, one GenAI unified-response envelope with
 *   messageSecret + forwardedAiBotMessageInfo (r18 / Omegatech parity).
 *
 * CTA taps inside the 3PExt widget show a toast (toast-only theater by
 * design — WhatsApp has no server-side handler for them).
 */
import {
  sendUnifiedRich, productItemCard, markdownText, extWidget,
  followUpPills, singleSection, hScrollSection,
} from '../../lib/vipRichKit.js';

export default {
  name: 'vipcard',
  aliases: ['viprich'],
  category: 'owner',
  description: '👑 Sends the VIP unified-response rich card (r18 envelope showcase).',
  permissions: { owner: true },
  cooldown: 8000,

  execute: async ({ m, sock }) => {
    await sendUnifiedRich(sock, m.from, {
      disclaimer: 'VIP Rich Card',
      submessages: [{ messageType: 2, messageText: '👑 41MA VIP Rich Card' }],
      sections: [
        singleSection(productItemCard({
          title: '👑 VIP Rich Card!',
          brand: '41MA',
          price: '✅ Online',
          imageUrl: 'https://res.cloudinary.com/di2a9lenz/image/upload/v1786909227/omegatech_ai_media/upload-1786909226872.jpg',
        })),
        singleSection(markdownText(
          '✅ *Unified Response Envelope*\n\n' +
          '📡 *Layout:* 4 sections (single + hscroll)\n' +
          '🧩 *Primitives:* product card, markdown, 3PExt widget, pills\n' +
          '🔐 *Secret:* injected · 🤖 *BotJid:* @bot · 🏷️ *ForwardOrigin:* 4\n\n' +
          '_CTA taps show a toast (toast-only theater by design)._'
        )),
        hScrollSection([
          extWidget({
            title: '⚡ 41MA VIP',
            ctas: [
              { label: 'Menu', toast: 'Show Menu', toolCallId: '00' },
              { label: 'Status', toast: 'Show Status', toolCallId: '01' },
              { label: 'Channel', toast: 'Join Channel', toolCallId: '02' },
            ],
          }),
          ...followUpPills(['N', 'E', 'X', 'O', 'R', 'A']),
          markdownText('N\nE\nX\nO\nR\nA'),
          productItemCard({ title: '41MA Bot', brand: '41MA', price: 'r18', salePrice: 'Free' }),
        ]),
        singleSection(markdownText(
        )),
      ],
      quoted: m,
    });
  },
};
