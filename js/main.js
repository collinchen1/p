
const loadingScreen = document.querySelector('.loading-screen')
const mainNavigation = document.querySelector('.main-navigation')

function pageTransitionIn() {
  return gsap
    .to(loadingScreen, { duration: .5, scaleY: 1, transformOrigin: 'bottom left'})
}
function pageTransitionOut(container) {
  return gsap
    .timeline({ delay: 1 }) 
    .add('start') 
    .to(loadingScreen, {
      duration: 0.5,
      scaleY: 0,
      skewX: 0,
      transformOrigin: 'top left',
      ease: 'power1.out'
    }, 'start')
    .call(contentAnimation, [container], 'start')
}


function contentAnimation(container) {
  $(container.querySelector('.green-heading-bg')).addClass('show')
  return gsap
    .timeline()
    .from(container.querySelector('.is-animated'), {
      duration: 0.5,
      translateY: 10,
      opacity: 0,
      stagger: 0.4
    })
    .from(mainNavigation, { duration: .5, translateY: -10, opacity: 0})
}

$(function() {
  barba.init({
    transitions: [{
      async leave(data) {
        await pageTransitionIn()
        data.current.container.remove()
      },
      async enter(data) {
        await pageTransitionOut(data.next.container)
      },
      async once(data) {
        await contentAnimation(data.next.container);
      }
    }]
  });

});
