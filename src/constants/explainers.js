export const EXPLAINERS = [
  {
    title: 'BOLT11 invoices fix typing Bitcoin addresses',
    issue: 'Everybody (even highly technical users) is afraid of typing or pasting them wrong and losing money -- and rightfully so! It\'s a very stressful experience that is significantly hindering Bitcoin adoption.',
    solution: 'The Lightning invoice contain a signature and a checksum and thus it\'s immediately obvious when they were typed wrong, money is never sent to the wrong place. Thus, using Lightning invoices is a breez and very easy on the mind, paying on the internet becomes as seamless as it never was.'
  },
  {
    title: 'Metadata helps accountability and is approachable to humans',
    issue: 'Bitcoin addresses are blank endpoints with no metadata whatsoever, it\'s hard to reason about them: are you sending the correct amount to the correct address? Is it too late to send? How many blocks are they going to wait for this to confirm? They also do not identify what you are paying for, or to whom.',
    solution: 'The Lightning invoice fixes this by including a description, a signature from the receiver, an amount that can\'t be ignored, an expiration date. Payments are now humanly identifiable, can\'t be paid twice and are immediately and obviously actionable from the moment you scan or paste them in your wallet.'
  },
  {
    title: 'The problem of receiving the correct amount is fixed by BOLT11',
    issue: 'This point cannot be stressed enough. A company that sells goods or services for Bitcoin or accepts Bitcoin deposits does not want to hold user balances for overpayments or send the balances back and cannot possibly be expected to handle underpayments, as these are very hard problems.',
    solution: 'By specifying an amount that can\'t be tampered with or changed, the BOLT11 invoice makes it so that is never a problem again: invoices are either paid or not. The peace of mind and freed engineering time that comes from this simple fact is in incalculable.'
  }
]
