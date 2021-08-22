const initFundingBox = function(selector) {
  const fundingElement = document.querySelector(selector);
  const campaignElement = document.querySelector(".campaign");
  const celebrationElement = document.querySelector(".celebration");
  const progressRemainingElement = document.querySelector(`${selector} .progress-remaining`);
  const daysRemainingElement = document.querySelector(`${selector} .days-remaining`);
  const progressBarElement = document.querySelector(`${selector} .progress-bar`);
  const contributorsElement = document.querySelector(`${selector} .cta-contributors`);

  const funding = fundingElement.dataset;
  const bar = progressBarElement.dataset;

  const total = funding.total;
  const funded = funding.funded;
  if (funded >= total) {
    campaignElement.classList.add('hidden');
    celebrationElement.classList.remove('hidden');
  } else {
    const days = funding.days;
    const contributors = funding.contributors;

    const percentageReceived = (funded * 100 / total).toFixed(2);
    const amountRemaining = total - funded;

    daysRemainingElement.innerHTML = days;
    progressRemainingElement.innerHTML = amountRemaining;
    contributorsElement.innerHTML = contributors;

    bar.progress = `${percentageReceived}%`;
  }
}

document.addEventListener("DOMContentLoaded", function(event) {
  const fundingSelector = '#funding';
  const fundingElement = document.querySelector(fundingSelector);
  const form = document.querySelector('#funding form');

  initFundingBox(fundingSelector);

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const contribution = data.get('amount');

    const funding = fundingElement.dataset;
    funding.funded = parseFloat(funding.funded) + parseFloat(contribution);
    initFundingBox(fundingSelector);
  });
});
