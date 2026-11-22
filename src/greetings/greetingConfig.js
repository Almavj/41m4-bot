import fs from 'node:fs';
import path from 'node:path';
import { assetManager } from '../assets/assetManager.js';

const GREETING_DB_PATH = path.join(process.cwd(), 'database', 'greeting.json');

const defaultGreetingConfig = {
  enabled: true,
  goodbyeEnabled: true,
  style: 4,
  welcomeText: "👋 Welcome {user} to *{group}*!\n\nWe are glad to have you here. You are our {memberCount}th member! ✨\n\n👑 You made the cut — claim your Inner Circle spot: {channel}",
  goodbyeText: "😢 Goodbye {user}! We will miss you.",
  welcomeImage: "data:image/webp;base64,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",
  goodbyeImage: "data:image/webp;base64,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"
};

const ensureConfigExists = () => {
  const dir = path.dirname(GREETING_DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(GREETING_DB_PATH)) {
    fs.writeFileSync(`${GREETING_DB_PATH}.tmp`, JSON.stringify(defaultGreetingConfig, null, 2), 'utf-8');
      fs.renameSync(`${GREETING_DB_PATH}.tmp`, GREETING_DB_PATH);
  }
};

export const greetingConfig = {
  load() {
    try {
      ensureConfigExists();
      const content = fs.readFileSync(GREETING_DB_PATH, 'utf-8');
      return { ...defaultGreetingConfig, ...JSON.parse(content) };
    } catch (err) {
      console.error('[GREETING CONFIG] Load failed, returning defaults:', err);
      return defaultGreetingConfig;
    }
  },

  save(configData) {
    try {
      ensureConfigExists();
      fs.writeFileSync(`${GREETING_DB_PATH}.tmp`, JSON.stringify(configData, null, 2), 'utf-8');
      fs.renameSync(`${GREETING_DB_PATH}.tmp`, GREETING_DB_PATH);
      return true;
    } catch (err) {
      console.error('[GREETING CONFIG] Save failed:', err);
      return false;
    }
  },

  getEnabled() {
    return this.load().enabled;
  },

  setEnabled(val) {
    const data = this.load();
    data.enabled = !!val;
    this.save(data);
  },

  getGoodbyeEnabled() {
    return this.load().goodbyeEnabled;
  },

  setGoodbyeEnabled(val) {
    const data = this.load();
    data.goodbyeEnabled = !!val;
    this.save(data);
  },

  getStyle() {
    return this.load().style;
  },

  setStyle(styleId) {
    const data = this.load();
    const styleNum = parseInt(styleId, 10);
    if ([1, 2, 3, 4].includes(styleNum)) {
      data.style = styleNum;
      this.save(data);
      return true;
    }
    return false;
  },

  getWelcomeText() {
    return this.load().welcomeText;
  },

  setWelcomeText(text) {
    const data = this.load();
    data.welcomeText = text;
    this.save(data);
  },

  getGoodbyeText() {
    return this.load().goodbyeText;
  },

  setGoodbyeText(text) {
    const data = this.load();
    data.goodbyeText = text;
    this.save(data);
  },

  getWelcomeImage() {
    return assetManager.getAsset('welcome');
  },

  setWelcomeImage(urlOrPath) {
    const data = this.load();
    data.welcomeImage = urlOrPath;
    this.save(data);
    // Register custom welcome asset as manual override
    assetManager.registerManualAsset('welcome', urlOrPath);
  },

  getGoodbyeImage() {
    return assetManager.getAsset('goodbye');
  },

  setGoodbyeImage(urlOrPath) {
    const data = this.load();
    data.goodbyeImage = urlOrPath;
    this.save(data);
    // Register custom goodbye asset as manual override
    assetManager.registerManualAsset('goodbye', urlOrPath);
  }
};

export default greetingConfig;
