import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('레시피 시드 시작...');

  // 카테고리 생성
  const categories = await Promise.all([
    prisma.recipeCategory.upsert({
      where: { name: '베이커리' },
      update: {},
      create: { name: '베이커리', order: 1 },
    }),
    prisma.recipeCategory.upsert({
      where: { name: '디저트' },
      update: {},
      create: { name: '디저트', order: 2 },
    }),
    prisma.recipeCategory.upsert({
      where: { name: '브런치' },
      update: {},
      create: { name: '브런치', order: 3 },
    }),
  ]);

  const [bakeryCategory, dessertCategory, brunchCategory] = categories;

  console.log('카테고리 생성 완료:', categories.map(c => c.name).join(', '));

  // 레시피 데이터
  const recipes = [
    {
      categoryId: dessertCategory.id,
      title: '슈크림',
      description: `<h3>재료</h3>
<p><strong>슈 반죽</strong></p>
<ul>
<li>물 125g</li>
<li>버터 55g</li>
<li>소금 2g</li>
<li>설탕 2g</li>
<li>박력분 75g</li>
<li>계란 약 2.5개 (125g)</li>
</ul>

<p><strong>커스터드 크림</strong></p>
<ul>
<li>우유 500g</li>
<li>설탕 100g</li>
<li>계란 노른자 4개</li>
<li>박력분 20g</li>
<li>옥수수 전분 20g</li>
<li>바닐라빈 1개</li>
<li>버터 30g</li>
</ul>

<h3>만드는 법</h3>
<ol>
<li>냄비에 물, 버터, 소금, 설탕을 넣고 끓인다.</li>
<li>불을 끄고 박력분을 넣어 빠르게 섞는다.</li>
<li>다시 약불에서 반죽이 냄비 바닥에서 떨어질 때까지 저어준다.</li>
<li>볼에 옮기고 식힌 후 계란을 조금씩 넣으며 섞는다.</li>
<li>짤주머니에 넣고 원형으로 짜서 190°C 오븐에서 25분간 굽는다.</li>
<li>커스터드 크림을 만들어 식힌 슈에 채운다.</li>
</ol>`,
      isPublished: true,
      isFeatured: true,
    },
    {
      categoryId: bakeryCategory.id,
      title: '쌀 허니 휘낭시에',
      description: `<h3>재료 (약 12개 분량)</h3>
<ul>
<li>쌀가루 80g</li>
<li>아몬드 파우더 60g</li>
<li>슈가파우더 120g</li>
<li>소금 2g</li>
<li>계란 흰자 100g</li>
<li>꿀 30g</li>
<li>버터 (태운 버터) 100g</li>
</ul>

<h3>만드는 법</h3>
<ol>
<li>버터를 약불에서 갈색이 될 때까지 태워 식힌다.</li>
<li>쌀가루, 아몬드 파우더, 슈가파우더, 소금을 체에 친다.</li>
<li>계란 흰자와 꿀을 넣고 잘 섞는다.</li>
<li>태운 버터를 넣고 섞어 랩을 씌워 냉장고에서 1시간 휴지한다.</li>
<li>휘낭시에 틀에 반죽을 80% 채운다.</li>
<li>180°C로 예열한 오븐에서 12-15분간 굽는다.</li>
</ol>

<h3>포인트</h3>
<p>쌀가루를 사용해 촉촉하고 글루텐 프리로 더욱 건강하게 즐길 수 있습니다.</p>`,
      isPublished: true,
      isFeatured: true,
    },
    {
      categoryId: bakeryCategory.id,
      title: '쌀 호박 카스테라',
      description: `<h3>재료</h3>
<ul>
<li>쌀가루 150g</li>
<li>단호박 퓨레 200g</li>
<li>계란 4개</li>
<li>설탕 120g</li>
<li>꿀 30g</li>
<li>우유 50ml</li>
<li>식용유 40ml</li>
<li>베이킹파우더 5g</li>
</ul>

<h3>만드는 법</h3>
<ol>
<li>단호박을 쪄서 곱게 으깬 후 식힌다.</li>
<li>계란과 설탕을 넣고 연한 미색이 될 때까지 휘핑한다.</li>
<li>단호박 퓨레, 꿀, 우유, 식용유를 순서대로 넣고 섞는다.</li>
<li>쌀가루와 베이킹파우더를 체에 쳐서 넣고 가볍게 섞는다.</li>
<li>틀에 부어 160°C 오븐에서 40-45분간 굽는다.</li>
<li>완전히 식힌 후 꺼낸다.</li>
</ol>`,
      isPublished: true,
      isFeatured: false,
    },
    {
      categoryId: bakeryCategory.id,
      title: '레몬 마들렌',
      description: `<h3>재료 (약 12개 분량)</h3>
<ul>
<li>박력분 100g</li>
<li>베이킹파우더 3g</li>
<li>계란 2개</li>
<li>설탕 80g</li>
<li>꿀 15g</li>
<li>버터 100g</li>
<li>레몬 제스트 1개분</li>
<li>레몬즙 15ml</li>
</ul>

<h3>만드는 법</h3>
<ol>
<li>버터를 녹여 식힌다.</li>
<li>계란과 설탕, 꿀을 넣고 잘 섞는다.</li>
<li>박력분과 베이킹파우더를 체에 쳐서 넣고 섞는다.</li>
<li>녹인 버터, 레몬 제스트, 레몬즙을 넣고 섞는다.</li>
<li>랩을 씌워 냉장고에서 최소 2시간 휴지한다.</li>
<li>마들렌 틀에 반죽을 80% 채우고 180°C에서 12분간 굽는다.</li>
</ol>

<h3>포인트</h3>
<p>반죽을 충분히 휴지시켜야 배꼽이 예쁘게 나옵니다.</p>`,
      isPublished: true,
      isFeatured: false,
    },
    {
      categoryId: bakeryCategory.id,
      title: '누룩 소금빵',
      description: `<h3>재료 (8개 분량)</h3>
<p><strong>반죽</strong></p>
<ul>
<li>강력분 250g</li>
<li>누룩 파우더 10g</li>
<li>설탕 20g</li>
<li>소금 5g</li>
<li>인스턴트 드라이이스트 4g</li>
<li>우유 160ml</li>
<li>버터 20g</li>
</ul>

<p><strong>충전용</strong></p>
<ul>
<li>가염 버터 80g (8조각)</li>
<li>굵은 소금 약간</li>
</ul>

<h3>만드는 법</h3>
<ol>
<li>버터를 제외한 반죽 재료를 섞어 글루텐이 형성될 때까지 반죽한다.</li>
<li>버터를 넣고 반죽이 매끄러워질 때까지 치댄다.</li>
<li>1차 발효 60분 (2배 크기)</li>
<li>8등분하여 둥글리기 후 15분 휴지</li>
<li>삼각형으로 밀어 버터를 넣고 말아준다.</li>
<li>2차 발효 40분 후 굵은 소금을 뿌린다.</li>
<li>200°C에서 15분간 굽는다.</li>
</ol>`,
      isPublished: true,
      isFeatured: true,
    },
    {
      categoryId: bakeryCategory.id,
      title: '바나나 월넛 머핀',
      description: `<h3>재료 (12개 분량)</h3>
<ul>
<li>박력분 200g</li>
<li>베이킹파우더 5g</li>
<li>베이킹소다 3g</li>
<li>소금 2g</li>
<li>버터 80g</li>
<li>설탕 100g</li>
<li>계란 2개</li>
<li>바나나 (잘 익은 것) 3개</li>
<li>호두 60g</li>
<li>바닐라 익스트랙 5ml</li>
</ul>

<h3>만드는 법</h3>
<ol>
<li>버터를 실온에 두어 부드럽게 한다.</li>
<li>바나나를 포크로 으깬다.</li>
<li>버터와 설탕을 크림화한 후 계란을 하나씩 넣어 섞는다.</li>
<li>으깬 바나나와 바닐라 익스트랙을 넣고 섞는다.</li>
<li>가루류를 체에 쳐서 넣고 가볍게 섞는다.</li>
<li>호두를 넣고 섞어 머핀틀에 나눠 담는다.</li>
<li>180°C에서 20-25분간 굽는다.</li>
</ol>`,
      isPublished: true,
      isFeatured: false,
    },
    {
      categoryId: brunchCategory.id,
      title: '페퍼로니 치즈 베이글',
      description: `<h3>재료 (6개 분량)</h3>
<p><strong>베이글 반죽</strong></p>
<ul>
<li>강력분 300g</li>
<li>설탕 15g</li>
<li>소금 6g</li>
<li>인스턴트 드라이이스트 4g</li>
<li>물 180ml</li>
</ul>

<p><strong>토핑</strong></p>
<ul>
<li>페퍼로니 슬라이스 60g</li>
<li>모짜렐라 치즈 100g</li>
<li>파마산 치즈 30g</li>
</ul>

<h3>만드는 법</h3>
<ol>
<li>반죽 재료를 넣고 매끈해질 때까지 10분간 반죽한다.</li>
<li>1차 발효 60분</li>
<li>6등분하여 도넛 모양으로 성형한다.</li>
<li>2차 발효 20분</li>
<li>끓는 물에 꿀을 넣고 양면 30초씩 데친다.</li>
<li>페퍼로니와 치즈를 올린다.</li>
<li>200°C에서 15-18분간 굽는다.</li>
</ol>`,
      isPublished: true,
      isFeatured: false,
    },
    {
      categoryId: brunchCategory.id,
      title: '잠봉 애플 브리 크로와상',
      description: `<h3>재료 (4개 분량)</h3>
<ul>
<li>크로와상 4개</li>
<li>잠봉 (프랑스식 햄) 8장</li>
<li>브리 치즈 100g</li>
<li>사과 1개</li>
<li>버터 20g</li>
<li>꿀 2큰술</li>
<li>디종 머스타드 2큰술</li>
<li>루꼴라 약간</li>
</ul>

<h3>만드는 법</h3>
<ol>
<li>사과를 얇게 슬라이스한다.</li>
<li>팬에 버터를 두르고 사과를 살짝 캐러멜라이즈한다.</li>
<li>크로와상을 반으로 가른다.</li>
<li>아래 빵에 디종 머스타드를 바른다.</li>
<li>잠봉, 캐러멜라이즈한 사과, 브리 치즈를 올린다.</li>
<li>180°C 오븐에서 5분간 치즈가 녹을 때까지 굽는다.</li>
<li>루꼴라를 올리고 꿀을 뿌려 완성한다.</li>
</ol>`,
      isPublished: true,
      isFeatured: false,
    },
    {
      categoryId: dessertCategory.id,
      title: '티라미수',
      description: `<h3>재료 (4인분)</h3>
<ul>
<li>마스카포네 치즈 250g</li>
<li>계란 노른자 3개</li>
<li>설탕 60g</li>
<li>생크림 200ml</li>
<li>에스프레소 커피 200ml</li>
<li>커피 리큐어 (선택) 2큰술</li>
<li>레이디핑거 비스킷 200g</li>
<li>코코아 파우더 적당량</li>
</ul>

<h3>만드는 법</h3>
<ol>
<li>계란 노른자와 설탕을 연한 색이 될 때까지 휘핑한다.</li>
<li>마스카포네 치즈를 넣고 부드럽게 섞는다.</li>
<li>생크림을 80% 정도 휘핑하여 마스카포네 혼합물에 가볍게 섞는다.</li>
<li>에스프레소에 커피 리큐어를 섞는다.</li>
<li>레이디핑거를 커피에 빠르게 적셔 용기 바닥에 깐다.</li>
<li>마스카포네 크림을 올리고 반복한다.</li>
<li>냉장고에서 최소 4시간 숙성 후 코코아 파우더를 뿌린다.</li>
</ol>`,
      isPublished: true,
      isFeatured: true,
    },
    {
      categoryId: dessertCategory.id,
      title: '크림 브륄레',
      description: `<h3>재료 (4개 분량)</h3>
<ul>
<li>생크림 400ml</li>
<li>우유 100ml</li>
<li>바닐라빈 1개</li>
<li>계란 노른자 5개</li>
<li>설탕 80g</li>
<li>토핑용 설탕 적당량</li>
</ul>

<h3>만드는 법</h3>
<ol>
<li>생크림, 우유, 바닐라빈을 냄비에 넣고 끓기 직전까지 데운다.</li>
<li>계란 노른자와 설탕을 잘 섞는다.</li>
<li>뜨거운 크림을 노른자 혼합물에 조금씩 넣으며 섞는다.</li>
<li>체에 걸러 라메킨에 나눠 담는다.</li>
<li>베인마리 (중탕)으로 150°C 오븐에서 40-45분간 굽는다.</li>
<li>냉장고에서 4시간 이상 식힌다.</li>
<li>서빙 직전 설탕을 뿌리고 토치로 캐러멜라이즈한다.</li>
</ol>`,
      isPublished: true,
      isFeatured: false,
    },
    {
      categoryId: bakeryCategory.id,
      title: '브리오슈',
      description: `<h3>재료</h3>
<ul>
<li>강력분 250g</li>
<li>설탕 40g</li>
<li>소금 5g</li>
<li>인스턴트 드라이이스트 5g</li>
<li>계란 3개</li>
<li>우유 30ml</li>
<li>버터 (실온) 125g</li>
<li>계란물 (토핑용)</li>
</ul>

<h3>만드는 법</h3>
<ol>
<li>버터를 제외한 재료를 섞어 반죽한다.</li>
<li>글루텐이 형성되면 버터를 조금씩 넣으며 완전히 흡수시킨다.</li>
<li>반죽이 매끄러워지면 볼에 담아 랩을 씌운다.</li>
<li>냉장고에서 하룻밤 1차 발효</li>
<li>원하는 모양으로 성형 후 2차 발효 1시간</li>
<li>계란물을 바르고 180°C에서 15-20분간 굽는다.</li>
</ol>

<h3>포인트</h3>
<p>버터 함량이 높아 반죽이 찰질 수 있으니 차갑게 유지하며 작업하세요.</p>`,
      isPublished: true,
      isFeatured: false,
    },
    {
      categoryId: bakeryCategory.id,
      title: '시나몬 롤',
      description: `<h3>재료</h3>
<p><strong>반죽</strong></p>
<ul>
<li>강력분 300g</li>
<li>설탕 50g</li>
<li>소금 5g</li>
<li>인스턴트 드라이이스트 5g</li>
<li>우유 180ml</li>
<li>계란 1개</li>
<li>버터 40g</li>
</ul>

<p><strong>충전물</strong></p>
<ul>
<li>버터 (실온) 60g</li>
<li>황설탕 100g</li>
<li>시나몬 파우더 15g</li>
</ul>

<p><strong>크림치즈 프로스팅</strong></p>
<ul>
<li>크림치즈 100g</li>
<li>버터 30g</li>
<li>슈가파우더 100g</li>
<li>바닐라 익스트랙 5ml</li>
</ul>

<h3>만드는 법</h3>
<ol>
<li>반죽 재료를 섞어 매끈하게 반죽 후 1차 발효 60분</li>
<li>반죽을 직사각형으로 밀어 충전물을 골고루 바른다.</li>
<li>돌돌 말아 8등분한다.</li>
<li>팬에 담아 2차 발효 40분</li>
<li>180°C에서 20-25분간 굽는다.</li>
<li>식힌 후 크림치즈 프로스팅을 올린다.</li>
</ol>`,
      isPublished: true,
      isFeatured: true,
    },
    {
      categoryId: dessertCategory.id,
      title: '초코 브라우니',
      description: `<h3>재료</h3>
<ul>
<li>다크 초콜릿 200g</li>
<li>버터 150g</li>
<li>설탕 200g</li>
<li>계란 3개</li>
<li>바닐라 익스트랙 5ml</li>
<li>박력분 100g</li>
<li>코코아 파우더 30g</li>
<li>소금 2g</li>
<li>호두 (선택) 80g</li>
</ul>

<h3>만드는 법</h3>
<ol>
<li>초콜릿과 버터를 중탕으로 녹인다.</li>
<li>설탕을 넣고 섞는다.</li>
<li>계란을 하나씩 넣으며 잘 섞는다.</li>
<li>바닐라 익스트랙을 넣는다.</li>
<li>박력분, 코코아 파우더, 소금을 체에 쳐서 넣고 섞는다.</li>
<li>호두를 넣고 섞어 유산지 깐 팬에 붓는다.</li>
<li>180°C에서 25-30분간 굽는다.</li>
<li>완전히 식힌 후 자른다.</li>
</ol>

<h3>포인트</h3>
<p>퍼지한 식감을 원하면 살짝 덜 구워주세요.</p>`,
      isPublished: true,
      isFeatured: false,
    },
    {
      categoryId: bakeryCategory.id,
      title: '식빵',
      description: `<h3>재료 (1.5근 기준)</h3>
<ul>
<li>강력분 300g</li>
<li>설탕 30g</li>
<li>소금 6g</li>
<li>인스턴트 드라이이스트 5g</li>
<li>우유 200ml</li>
<li>버터 30g</li>
</ul>

<h3>만드는 법</h3>
<ol>
<li>버터를 제외한 재료를 섞어 반죽한다.</li>
<li>글루텐이 형성되면 버터를 넣고 매끈해질 때까지 반죽한다.</li>
<li>1차 발효 60분 (2배 크기)</li>
<li>가스 빼기 후 3등분하여 둥글리기</li>
<li>15분 휴지 후 밀어서 말아 식빵 틀에 담는다.</li>
<li>2차 발효 40분 (틀의 80%까지)</li>
<li>뚜껑을 덮고 180°C에서 30분간 굽는다.</li>
</ol>`,
      isPublished: true,
      isFeatured: false,
    },
    {
      categoryId: bakeryCategory.id,
      title: '바게트',
      description: `<h3>재료</h3>
<ul>
<li>강력분 300g</li>
<li>소금 6g</li>
<li>인스턴트 드라이이스트 3g</li>
<li>물 200ml</li>
</ul>

<h3>만드는 법</h3>
<ol>
<li>모든 재료를 섞어 10분간 반죽한다.</li>
<li>1차 발효 90분 (중간에 1회 펀칭)</li>
<li>2등분하여 타원형으로 만들고 20분 휴지</li>
<li>바게트 모양으로 성형</li>
<li>2차 발효 40분</li>
<li>쿠프 (칼집)를 넣고 분무기로 물을 뿌린다.</li>
<li>230°C에서 스팀과 함께 20-25분간 굽는다.</li>
</ol>

<h3>포인트</h3>
<p>스팀 없이 구우면 껍질이 두꺼워지니 물을 충분히 뿌려주세요.</p>`,
      isPublished: true,
      isFeatured: false,
    },
    {
      categoryId: dessertCategory.id,
      title: '치즈케이크',
      description: `<h3>재료</h3>
<p><strong>바텀</strong></p>
<ul>
<li>다이제스티브 비스킷 150g</li>
<li>버터 70g</li>
</ul>

<p><strong>치즈 필링</strong></p>
<ul>
<li>크림치즈 400g</li>
<li>설탕 100g</li>
<li>생크림 200ml</li>
<li>계란 2개</li>
<li>바닐라 익스트랙 5ml</li>
<li>레몬즙 1큰술</li>
</ul>

<h3>만드는 법</h3>
<ol>
<li>비스킷을 곱게 부수고 녹인 버터와 섞어 틀 바닥에 눌러 담는다.</li>
<li>냉장고에서 30분간 굳힌다.</li>
<li>크림치즈를 부드럽게 풀고 설탕을 넣어 섞는다.</li>
<li>계란을 하나씩 넣으며 섞는다.</li>
<li>생크림, 바닐라, 레몬즙을 넣고 섞는다.</li>
<li>바텀 위에 붓고 160°C에서 50-60분간 굽는다.</li>
<li>오븐 문을 살짝 열어 천천히 식힌 후 냉장 보관한다.</li>
</ol>`,
      isPublished: true,
      isFeatured: true,
    },
    {
      categoryId: brunchCategory.id,
      title: '에그 베네딕트',
      description: `<h3>재료 (2인분)</h3>
<p><strong>홀란다이즈 소스</strong></p>
<ul>
<li>계란 노른자 2개</li>
<li>버터 100g</li>
<li>레몬즙 1큰술</li>
<li>소금, 카옌페퍼 약간</li>
</ul>

<p><strong>메인</strong></p>
<ul>
<li>잉글리시 머핀 2개</li>
<li>햄 또는 베이컨 4장</li>
<li>계란 4개</li>
<li>식초 1큰술</li>
<li>쪽파 약간</li>
</ul>

<h3>만드는 법</h3>
<ol>
<li>버터를 녹여 맑은 부분만 준비한다.</li>
<li>노른자와 레몬즙을 중탕하며 거품기로 저어 농도를 낸다.</li>
<li>녹인 버터를 조금씩 넣으며 유화시킨다.</li>
<li>끓는 물에 식초를 넣고 소용돌이를 만들어 계란을 포칭한다.</li>
<li>구운 머핀 위에 햄, 포칭한 계란을 올린다.</li>
<li>홀란다이즈 소스를 끼얹고 쪽파를 뿌린다.</li>
</ol>`,
      isPublished: true,
      isFeatured: false,
    },
    {
      categoryId: bakeryCategory.id,
      title: '크로와상',
      description: `<h3>재료</h3>
<p><strong>반죽</strong></p>
<ul>
<li>강력분 250g</li>
<li>설탕 30g</li>
<li>소금 5g</li>
<li>인스턴트 드라이이스트 5g</li>
<li>우유 130ml</li>
<li>버터 25g</li>
</ul>

<p><strong>접기용</strong></p>
<ul>
<li>버터 (냉장) 150g</li>
</ul>

<h3>만드는 법</h3>
<ol>
<li>반죽 재료를 섞어 매끈하게 반죽 후 냉장 휴지 1시간</li>
<li>버터를 정사각형으로 밀어 준비한다.</li>
<li>반죽을 버터보다 크게 밀어 버터를 감싼다.</li>
<li>3겹 접기 → 냉장 30분 → 3겹 접기를 3회 반복</li>
<li>5mm 두께로 밀어 삼각형으로 자른다.</li>
<li>넓은 쪽부터 돌돌 말아 성형</li>
<li>2차 발효 2시간 (실온)</li>
<li>계란물을 바르고 200°C에서 15-18분간 굽는다.</li>
</ol>`,
      isPublished: true,
      isFeatured: true,
    },
    {
      categoryId: dessertCategory.id,
      title: '팬케이크',
      description: `<h3>재료 (약 8장)</h3>
<ul>
<li>박력분 150g</li>
<li>베이킹파우더 5g</li>
<li>설탕 30g</li>
<li>소금 2g</li>
<li>계란 1개</li>
<li>우유 200ml</li>
<li>버터 (녹인 것) 30g</li>
<li>바닐라 익스트랙 5ml</li>
</ul>

<h3>만드는 법</h3>
<ol>
<li>박력분, 베이킹파우더, 설탕, 소금을 체에 친다.</li>
<li>계란, 우유, 녹인 버터, 바닐라를 섞는다.</li>
<li>가루류에 액체를 넣고 덩어리가 약간 남을 정도로만 섞는다.</li>
<li>약불로 예열한 팬에 반죽을 동그랗게 붓는다.</li>
<li>표면에 기포가 생기면 뒤집어 2분간 굽는다.</li>
<li>메이플 시럽, 버터, 과일과 함께 서빙한다.</li>
</ol>`,
      isPublished: true,
      isFeatured: false,
    },
    {
      categoryId: dessertCategory.id,
      title: '과일 타르트',
      description: `<h3>재료</h3>
<p><strong>타르트 쉘</strong></p>
<ul>
<li>박력분 200g</li>
<li>버터 100g</li>
<li>슈가파우더 60g</li>
<li>계란 노른자 1개</li>
<li>소금 2g</li>
</ul>

<p><strong>커스터드 크림</strong></p>
<ul>
<li>우유 250ml</li>
<li>설탕 50g</li>
<li>계란 노른자 2개</li>
<li>옥수수 전분 15g</li>
<li>바닐라빈 1/2개</li>
<li>버터 15g</li>
</ul>

<p><strong>토핑</strong></p>
<ul>
<li>제철 과일 (딸기, 블루베리, 키위 등)</li>
<li>나파주 (광택용)</li>
</ul>

<h3>만드는 법</h3>
<ol>
<li>타르트 반죽 재료를 섞어 냉장 휴지 1시간</li>
<li>3mm로 밀어 틀에 맞추고 포크로 찔러준다.</li>
<li>180°C에서 15-20분간 블라인드 베이킹</li>
<li>커스터드 크림을 만들어 식힌다.</li>
<li>식힌 타르트에 크림을 채우고 과일을 올린다.</li>
<li>나파주를 발라 마무리한다.</li>
</ol>`,
      isPublished: true,
      isFeatured: false,
    },
  ];

  // 레시피 생성
  for (const recipe of recipes) {
    await prisma.recipe.create({
      data: recipe,
    });
    console.log(`레시피 생성: ${recipe.title}`);
  }

  console.log(`\n총 ${recipes.length}개의 레시피가 생성되었습니다.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
