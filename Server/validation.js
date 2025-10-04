// Validation helpers (CommonJS)

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9+()\-\s]{6,20}$/;

function validateFields(body) {
  const { name, email, phone, service, requirements, website } = body;
  if (website && String(website).trim() !== '') return { isBot: true };
  if (!name || !email || !phone || !service || !requirements) return { error: 'Missing required fields.' };
  if (!emailRegex.test(email)) return { error: 'Invalid email format.' };
  if (!phoneRegex.test(phone)) return { error: 'Invalid phone format.' };
  return { ok: true };
}

module.exports = {
  emailRegex,
  phoneRegex,
  validateFields,
};
