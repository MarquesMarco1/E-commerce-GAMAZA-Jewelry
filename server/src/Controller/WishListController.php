<!-- <?php 

// namespace App\Controller;
// use App\Entity\WishListItem;
// use App\Entity\WishList;
// use App\Entity\User;
// use Symfony\Component\HttpFoundation\Request;
// use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
// use Symfony\Component\Routing\Attribute\Route;
// use Doctrine\ORM\EntityManagerInterface;


// class WishListController extends AbstractController
// {
//     #[Route('/api/wishList/{id}', name: 'app_wishList_add', methods: ['POST'])]
//     public function addToWishList(Request $request, EntityManagerInterface $entityManager, int $id)
//     {
//         $user = $entityManager->getRepository(User::class)->find($id);
//         $wishList = $entityManager->getRepository(WishList::class)->findOneBy(['user' => $user->getId()]);

        // $data = json_decode($request->getContent(), true);
        // $formData = $data["formData"];

        // if($wishList === null){
        //         $wishList = new WishList;
        //         $wishList->setUser($user);
        //         $entityManager->persist($wishList);
        //         $entityManager->flush();
        // } else {
        //     $wishListId = $wishList;
        // }

//         return $this->json(['success' => $user], 200);
//     }
// } 